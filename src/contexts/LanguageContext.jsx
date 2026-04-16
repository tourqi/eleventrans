import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { UI, DATA } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'id';
    } catch {
      return 'id';
    }
  });

  const changeLang = useCallback((newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('lang', newLang);
    } catch {
      /* no-op */
    }
  }, []);

  const toggleLang = useCallback(() => {
    changeLang(lang === 'id' ? 'en' : 'id');
  }, [lang, changeLang]);

  /** Translate a UI key — e.g. t('hero.title1') */
  const t = useCallback(
    (key) => {
      const dict = UI[lang] || UI.id;
      return dict[key] ?? UI.id[key] ?? key;
    },
    [lang],
  );

  /** Translate a data string — falls back to original if no translation */
  const td = useCallback(
    (text) => {
      if (lang === 'id' || !text) return text;
      return DATA[text] ?? text;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang: changeLang, toggleLang, t, td }),
    [lang, changeLang, toggleLang, t, td],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
