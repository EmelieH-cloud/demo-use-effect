---
I denna demo används följande useEffect()-metod. 

```javascript
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
```
## Varför useEffect() i sig själv inte får vara asynkron:

Om useEffect teoretiskt sett tilläts vara asynkron, skulle det kunna orsaka en rad potentiella problem,
både från teknisk och användarens synvinkel. För att förstå detta tydligt, låt oss gå igenom några möjliga 
scenarier där användaren skulle kunna uppleva problem.

### Komponenten kan bli klar innan useEffect() är klar 
Anta att vi har en komponent som hämtar användarens profilinformation från ett API. Om useEffect() är asynkron, 
kan kan komponenten som ska visa profilinformationen bli klar innan useEffect() är klar. 
Här är ett exempel på det:

```javascript
import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from './mockApi';  // En funktion som hämtar användarens profildata

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const data = await fetchUserProfile();  
      setProfile(data); 
    } catch (err)
{
      setError('Något gick fel vid hämtning av profilen');
    } finally {
      setLoading(false); 
    }
  }, []);  // Effekt körs bara en gång, när komponenten mountas

  if (loading) {
    return <div>Laddar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.email}</p>
    </div>
  );
};

export default Profile;
```
