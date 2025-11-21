export const translations = {
  fr: { 'app-title':'RGSC — REGISTRE DE GESTION SCOLAIRE', 'dashboard':'Tableau de bord', 'students':'Élèves', 'settings':'Paramètres', 'create-new-year':'Créer une nouvelle année...' },
  en: { 'app-title':'RGSC — School Registry', 'dashboard':'Dashboard', 'students':'Students', 'settings':'Settings', 'create-new-year':'Create new year...' }
};

export let currentLanguage = 'fr';
export function setupI18n(lang='fr'){ currentLanguage = lang; }
export function t(key){ return translations[currentLanguage]?.[key] || translations['fr']?.[key] || key; }
