import { createContext, useState, useEffect } from "react";
import { fetchFilters } from "../services/api";
// Crear el contexto
export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filtros, setFiltros] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [errorFilters, setErrorFilters] = useState(null);

   useEffect(() => {
         
          const loadFiltros = async () => {
              
              try {
                  const data = await fetchFilters();
                  setFiltros(data); 
              } catch (error) {
                  setErrorFilters(error.message);
              } finally {
                  setLoadingFilters(false);
              }
          };
          loadFiltros();
      }, []);

  return (
    <FiltersContext.Provider
      value={{
        filtros,
        loadingFilters,
        errorFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};


