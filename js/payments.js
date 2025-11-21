import { appData, ensureSchoolYear, saveData } from './data.js';

export function recordPayment(payload){
  const sy = ensureSchoolYear(appData.currentSchool, appData.currentSchoolYear);
  sy.payments.push(payload);
  saveData();
}
