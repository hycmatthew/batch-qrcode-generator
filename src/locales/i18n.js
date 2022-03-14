import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from './en/translation.json'
import sc from './sc/translation.json'
import tc from './tc/translation.json'

const resources = {
  en: {
    translation: en
  },
  sc: {
    translation: sc
  },
  tc: {
    translation: tc
  },
};

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: { order: ['localStorage'] },
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
})

export default i18n