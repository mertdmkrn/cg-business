import { createI18n } from 'vue-i18n';
import en from '../assets/locales/en.json';
import tr from '../assets/locales/tr.json';
import store from '../store';

const messages = {
  en,
  tr
};

const language = store.getters._language; 
const availableLocales = ['en', 'tr'];
const browserLocale = navigator.language.split('-')[0];
let locale = availableLocales.includes(browserLocale) ? browserLocale : 'en';

if(language) {
  locale = availableLocales.includes(browserLocale) ? language : browserLocale;
}
else {
  store.commit("setLanguage", locale);
}

export default createI18n({
  locale: locale,
  messages,
});