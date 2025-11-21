import { appData, saveData } from './data.js';

export function renderSettingsSection(container){
  container.innerHTML = `<div class="card"><h3>Paramètres École</h3>
    <div style="display:grid;gap:8px">
      <input id="input-school-name" placeholder="Nom de l'école" value="${appData.settings.schoolName||''}" />
      <input id="input-school-phone" placeholder="Téléphone" value="${appData.settings.schoolPhone||''}" />
      <button class="btn" id="btn-save-settings">Enregistrer</button>
    </div></div>`;
  document.getElementById('btn-save-settings').addEventListener('click', ()=>{
    appData.settings.schoolName = document.getElementById('input-school-name').value;
    appData.settings.schoolPhone = document.getElementById('input-school-phone').value;
    saveData(); alert('Paramètres sauvegardés');
  });
}
