import { useState } from "react";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

/**
 * Simple i18n hook (no libraries)
 * Default language: Spanish
 */

const dictionaries = {
  es,
  en,
};

export function useTranslation(defaultLang = "es") {
  const [lang, setLang] = useState(defaultLang);

  const t = (key) => {
    const keys = key.split(".");
    let value = dictionaries[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const changeLanguage = (newLang) => {
    if (dictionaries[newLang]) {
      setLang(newLang);
    }
  };

  return {
    t,
    lang,
    changeLanguage,
  };
}