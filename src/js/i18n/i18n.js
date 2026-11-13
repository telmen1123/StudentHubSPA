
import { translations } from "./translations.js";

const STORAGE_KEY = "studenthub-language";

let currentLanguage = "mn";

// Хадгалсан хэлийг унших
export function getLanguage() {
  return currentLanguage;
}

// Хэлийг өөрчлөх
export function setLanguage(lang) {
  if (!translations[lang]) {
    return;
  }

  currentLanguage = lang;

  localStorage.setItem(STORAGE_KEY, lang);

  document.documentElement.lang = lang;

  window.dispatchEvent(
    new CustomEvent("languageChanged", {
      detail: { language: lang }
    })
  );
}

// Хэл солих
export function toggleLanguage() {
  const newLanguage =
    currentLanguage === "mn" ? "en" : "mn";

  setLanguage(newLanguage);
}

// Орчуулгын текст авах
export function t(key) {
  const keys = key.split(".");

  let value = translations[currentLanguage];

  for (const part of keys) {
    value = value?.[part];
  }

  if (typeof value === "string") {
    return value;
  }

  return key;
}

// Эхний хэлний тохиргоо
export function initI18n() {
  const savedLanguage =
    localStorage.getItem(STORAGE_KEY);

  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  } else {
    currentLanguage = "mn";
  }

  document.documentElement.lang = currentLanguage;
}
