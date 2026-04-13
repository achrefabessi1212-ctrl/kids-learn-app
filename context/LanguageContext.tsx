"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Lang = "ar" | "en";
type ContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<ContextType | null>(null);

const translations: Record<string, Record<Lang, string>> = {
  welcome: { ar: "مرحباً يا بطل! 🌟", en: "Hello Champion! 🌟" },
  start: { ar: "ابدأ التعلم", en: "Start Learning" },
  parent: { ar: "لوحة الوالدين", en: "Parent Dashboard" },
  alphabet: { ar: "الحروف", en: "Alphabet" },
  numbers: { ar: "الأرقام", en: "Numbers" },
  colors: { ar: "الألوان", en: "Colors" },
  screenTime: { ar: "حان وقت الراحة! 😊", en: "Time for a break! 😊" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("kids-learn-lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("kids-learn-lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
