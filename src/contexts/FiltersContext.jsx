import { createContext, useState, useContext, useEffect } from "react";
import { fetchModalities, fetchMunicipalities, fetchServices, fetchSpaceTypes} from "../services/api";
// Crear el contexto
export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [municipalities, setMunicipalities] = useState([]);
  const [spacesTypes, setSpaceTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const municipalities = await fetchMunicipalities();
      setMunicipalities(municipalities);
      const spaceTypes = await fetchSpaceTypes();
      setSpaceTypes(spaceTypes);
      const services = await fetchServices();
      setServices(services);
      const modalities = await fetchModalities();
      setModalities(modalities);
    } catch (err) {
      setError(`Error al cargar los datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        municipalities,
        spacesTypes,
        modalities,
        services,
        loading,
        error,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

// Custom hook para usar los filtros
export const useFilters = () => {
    const context = useContext(FiltersContext);
  
    if (!context) {
      throw new Error("useFilters debe ser usado dentro de FiltersProvider");
    }
  
    return context;
  };

