import { createContext, useState, useEffect } from 'react';
import { fetchSpaces } from '../services/api';

export const SpacesContext = createContext();

export const SpacesProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSpaces = async () => {
      try {
        const data = await fetchSpaces();
        const sortedData = data.sort((a, b) => b.puntuacion_total - a.puntuacion_total);
        setSpaces(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSpaces();
  }, []);

  return (
    <SpacesContext.Provider value={{ spaces, loading, error }}>
      {children}
    </SpacesContext.Provider>
  );
};
