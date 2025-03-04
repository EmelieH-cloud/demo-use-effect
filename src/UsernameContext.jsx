import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUsernameFromApi } from './mockApi'; // Importerar vårt mock API

// Skapa context 
const UsernameContext = createContext();

// Skapa provider 
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);      

  // useEffect för att hämta användarnamnet direkt när appen startas 
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        setLoading(true);
        setError(null);

        // Använder vårt mock API för att hämta användarnamnet
        const data = await fetchUsernameFromApi();

        // Uppdaterar användarnamnet när API-anropet är klart
        setUsername(data.username);
      } catch (err) {
        setError('Något gick fel vid hämtning av användarnamn!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []); // Körs endast en gång när komponenten mountas

  return (
    <UsernameContext.Provider value={{ username, setUsername, loading, error }}>
      {children}
    </UsernameContext.Provider>
  );
};

// Custom Hook för att använda användarnamn contexten
export const useUsername = () => {
  return useContext(UsernameContext);
};
