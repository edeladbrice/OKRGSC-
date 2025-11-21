import { appData, saveData, ensureSchoolYear } from './data.js';
import { t } from './translations.js';
import * as studentsModule from './students.js';
import * as paymentsModule from './payments.js';
import * as settingsModule from './settings.js';

export function initUI(){
  renderHeader();
  renderRoot();
  attachGlobals();
}

function renderHeader(){
  const h = document.getElementById('app-header');
  h.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;"><div style="display:flex;gap:12px;align-items:center"><img src="assets/img/logo.png" alt="logo" style="width:44px;height:44px;object-fit:contain;border-radius:8px"/><div><div style="font-weight:700">${t('app-title')}</div><div style="font-size:12px">OKBW Service</div></div></div><div><button class="btn" id="btn-backup">Sauvegarder</button><button class="btn" id="btn-restore">Restaurer</button></div></div>`;
}

function renderRoot(){
  const root = document.getElementById('app-root');
  root.innerHTML = `
  <div class="container">
    <div class="nav card" style="display:flex;gap:10px;align-items:center">
      <button data-section="dashboard" class="btn nav-btn">${t('dashboard')}</button>
      <button data-section="students" class="btn nav-btn">${t('students')}</button>
      <button data-section="settings" class="btn nav-btn">${t('settings')}</button>
    </div>

    <div id="section-container" style="margin-top:18px"></div>
  </div>
  `;
  showSection('dashboard');
}

function attachGlobals(){
  document.getElementById('btn-backup').addEventListener('click', ()=>{
    import('./data.js').then(m=>m.exportBackup());
  });
  document.getElementById('btn-restore').addEventListener('click', ()=>{
    const f = document.createElement('input'); f.type='file'; f.accept='application/json'; f.onchange = e => {
      const file = e.target.files[0]; import('./data.js').then(m=>m.importBackup(file).then(()=>location.reload()));
    }; f.click();
  });

  document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click', ()=> showSection(b.dataset.section)));
}

export function showSection(name){
  const container = document.getElementById('section-container');
  switch(name){
    case 'students': studentsModule.renderStudentsSection(container); break;
    case 'settings': settingsModule.renderSettingsSection(container); break;
    default:
      container.innerHTML = `<div class="card"><h3>${t('dashboard')}</h3><p>Bienvenue dans RGSC — OKBW Service</p></div>`;
  }
                             }
