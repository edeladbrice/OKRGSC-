import { initData } from './data.js';
import { initUI } from './ui.js';
import { setupI18n } from './translations.js';

// boot
document.addEventListener('DOMContentLoaded', async ()=>{
  // default language
  setupI18n('fr');
  await initData();
  initUI();
  console.log('RGSC ready — OKBW Service');
});
