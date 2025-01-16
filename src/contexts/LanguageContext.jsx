import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const LanguageContext = createContext();

// Proveedor de Idioma
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ca"); // Idioma predeterminado

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el contexto
export function useLanguage() {
  return useContext(LanguageContext);
}
