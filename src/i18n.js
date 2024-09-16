import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      chatTitle: "Coding Test",
      placeholder: "Enter your message...",
      sendMessage: "Send",
    },
  },
  ko: {
    translation: {
      chatTitle: "코딩 테스트",
      placeholder: "메시지를 입력하세요...",
      sendMessage: "전송",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
