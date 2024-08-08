import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationeng from "./translation/en.json"
import translationth from "./translation/th.json"

const resources = {
  en: {
    translation : translationeng
  },
  th:{
    translation : translationth
  }
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng: "en",
});

export default i18next;