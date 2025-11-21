// data.js
export let appData = null;
const STORAGE_KEY = 'rgsc_app_data_v1';

export async function initData(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){
    try{ appData = JSON.parse(raw); }
    catch(e){ console.warn('bad stored data, resetting', e); appData = defaultData(); }
  } else appData = defaultData();
  // ensure invariants
  appData.schools = appData.schools || { 'École Primaire': { schoolYears: {} , settings: appData.settings }};
  appData.currentSchool = appData.currentSchool || Object.keys(appData.schools)[0];
  appData.currentSchoolYear = appData.currentSchoolYear || createDefaultYear();
  saveData();
}

export function saveData(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function defaultData(){
  return {
    settings: {
      appName: 'RGSC — REGISTRE DE GESTION SCOLAIRE',
      provider: 'OKBW Service',
      schoolName: 'École Primaire',
      schoolPhone: '',
      schoolAddress: '',
      schoolLogo: '',
      signatureName: 'Le Directeur',
      signatureTitle: 'Directeur',
      schoolYearStartMonth: 9
    },
    schools: {},
    currentSchool: 'École Primaire',
    currentSchoolYear: ''
  };
}

function createDefaultYear(){
  const now = new Date();
  return `${now.getFullYear()}/${now.getFullYear()+1}`;
}

export function ensureSchoolYear(schoolName, year){
  const school = appData.schools[schoolName] ||= { schoolYears: {}, settings: {...appData.settings} };
  school.schoolYears[year] ||= { students: [], payments: [], teachers: [], grades: [] };
  return school.schoolYears[year];
}

export function exportBackup(){
  const blob = new Blob([JSON.stringify(appData, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'rgsc-backup.json'; a.click(); URL.revokeObjectURL(url);
}

export function importBackup(file){
  return new Promise((res,rej)=>{
    const reader = new FileReader();
    reader.onload = e => {
      try{ appData = JSON.parse(e.target.result); saveData(); res(true); }
      catch(err){ rej(err); }
    };
    reader.onerror = rej; reader.readAsText(file);
  });
}
