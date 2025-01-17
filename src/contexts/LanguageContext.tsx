import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import vi from "../locales/vi/translation.json";
import en from "../locales/en/translation.json";
import ko from "../locales/ko/translation.json";

// Định nghĩa kiểu ngôn ngữ
export type LanguageType = "vi" | "en" | "ko";

// Định nghĩa kiểu cho context
interface ILanguageContext {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
}

// Tạo Context với giá trị mặc định
const LanguageContext = createContext<ILanguageContext>({
  language: "en", // Đổi "vi" thành "en"
  setLanguage: () => {},
  t: () => "",
});

// Gom 3 file JSON vào 1 object dictionary để tra cứu
const dictionary: Record<LanguageType, Record<string, string>> = {
  vi,
  en,
  ko,
};

// Interface cho props của LanguageProvider
interface ILanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<ILanguageProviderProps> = ({
  children,
}) => {
  // Đọc ngôn ngữ được lưu trong localStorage, nếu không có thì mặc định là "en"
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLang = localStorage.getItem("lang") as LanguageType | null;
    return savedLang === "vi" || savedLang === "en" || savedLang === "ko"
      ? savedLang
      : "en"; // Đổi "vi" thành "en"
  });

  // Hàm dịch
  const t = (key: string) => {
    return dictionary[language][key] || key;
  };

  // Lưu khi ngôn ngữ thay đổi
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Tạo hook để dùng context
export const useLanguage = () => useContext(LanguageContext);
