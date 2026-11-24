import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('slide_ai_lang') || 'uz';
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('slide_ai_lang', newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
