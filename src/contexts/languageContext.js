import React, { createContext, useState, useContext } from "react";
import en from "../locales/en/translation.json";
import vi from "../locales/vi/translation.json";
import ko from "../locales/ko/translation.json";

// Tạo Context
const LanguageContext = createContext();

// Dữ liệu ngôn ngữ
const languages = {
  en,
  vi,
  ko,
};

// Provider
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en"); // Ngôn ngữ mặc định

  const changeLanguage = (language) => {
    setCurrentLanguage(language); // Thay đổi ngôn ngữ
  };

  const t = (key) => {
    return languages[currentLanguage][key] || key; // Lấy nội dung từ file ngôn ngữ
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook để sử dụng context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
