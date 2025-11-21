import { appData, ensureSchoolYear, saveData } from './data.js';
import { t } from './translations.js';

export function renderStudentsSection(container){
  const year = appData.currentSchoolYear || Object.keys(appData.schools[appData.currentSchool].schoolYears)[0];
  ensureSchoolYear(appData.currentSchool, year);
  container.innerHTML = `
    <div class="card">
      <h3>Gestion des élèves — ${year}</h3>
      <form id="form-add-student" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <input id="student-matricule" placeholder="Matricule" required />
        <input id="student-name" placeholder="Nom complet" required />
        <input id="student-class" placeholder="Classe" />
        <button class="btn" type="button" id="btn-add-student">Ajouter</button>
      </form>
      <div id="student-list" style="margin-top:12px"></div>
    </div>
  `;
  document.getElementById('btn-add-student').addEventListener('click', addStudent);
  renderStudentList();
}

function addStudent(){
  const mat = document.getElementById('student-matricule').value.trim();
  const name = document.getElementById('student-name').value.trim();
  const sclass = document.getElementById('student-class').value.trim() || 'N/A';
  if(!mat||!name){ alert('Matricule et nom requis'); return; }
  const schoolYear = ensureSchoolYear(appData.currentSchool, appData.currentSchoolYear);
  // avoid duplicates
  if(schoolYear.students.some(s=>s.matricule===mat)) { alert('Matricule existe'); return; }
  schoolYear.students.push({ matricule:mat, name, class:sclass, totalDue:0, totalPaid:0 });
  saveData(); renderStudentList();
}

function renderStudentList(){
  const schoolYear = ensureSchoolYear(appData.currentSchool, appData.currentSchoolYear);
  const list = schoolYear.students.map(s=>`<tr><td>${s.matricule}</td><td>${s.name}</td><td>${s.class}</td></tr>`).join('');
  document.getElementById('student-list').innerHTML = `<table class="table"><thead><tr><th>Matricule</th><th>Nom</th><th>Classe</th></tr></thead><tbody>${list}</tbody></table>`;
                            }
