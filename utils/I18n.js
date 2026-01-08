window.I18n = {
  lang: (localStorage.getItem('lang') || 'en'),

  setLang(lang) {
    this.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
  },

  t(key) {
    // key is dot-notated, e.g. "menu.title"
    const dict = window.I18N_STRINGS && window.I18N_STRINGS[this.lang] ? window.I18N_STRINGS[this.lang] : {};
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, dict) || '';
  },

  getChapter(id) {
    if (window.STORY_CHAPTERS_I18N && window.STORY_CHAPTERS_I18N[this.lang] && window.STORY_CHAPTERS_I18N[this.lang][id]) {
      return window.STORY_CHAPTERS_I18N[this.lang][id];
    }
    // fallback to English
    return (window.STORY_CHAPTERS_I18N && window.STORY_CHAPTERS_I18N['en'] && window.STORY_CHAPTERS_I18N['en'][id]) || null;
  }
};