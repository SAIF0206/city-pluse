import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to City Pulse",
      search: "Search",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبًا بك في سيتي بالس",
      search: "بحث",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
