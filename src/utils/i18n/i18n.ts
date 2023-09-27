import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationFR from "./fr/translations-fr";

// the translations
const resources = { fr: { translation: translationFR } };

void i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: "fr",
    resources,
  });

export default i18n;
