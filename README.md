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
## 1. Varför useEffect() i sig själv inte får vara asynkron:

Om useEffect teoretiskt sett tilläts vara asynkron, skulle det kunna orsaka en rad potentiella problem,
både från teknisk och användarens synvinkel. 

### 1.1 Komponenten kan bli klar innan useEffect() är klar 
Anta att vi har en komponent som hämtar användarens profilinformation från ett API. Om useEffect() är asynkron, 
kan kan komponenten som ska visa profilinformationen bli klar innan useEffect() är klar. 

### Vad användaren kan uppleva: 
Du ser en tom eller delvis renderad profil (exempelvis bara en del av användarens namn eller ingen profilbild) medan datan hämtas,
och den uppdateras senare när useEffect är klar. Detta kan skapa en ganska dålig användarupplevelse, eftersom användaren inte får
den information de förväntar sig på en gång.

```javascript

const Profile = () => {
  const [profile, setProfile] = useState(null); // State för användarens profil

  useEffect(async () => {
    try {
      const data = await fetchUserProfile();  // Hämtar data asynkront från API
      setProfile(data); // Uppdaterar state med data från API
    } catch (err) {
      setError('Något gick fel vid hämtning av profilen');
    }
  }, []);  // Effekt körs bara en gång när komponenten mountas

  if (loading) { // Laddningsindikator
    return <div>Laddar...</div>;
  }

  if (error) { // Hantering av fel
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{profile.username}</h1> // Visar användarens namn
      <p>{profile.email}</p> // Visar användarens e-post
    </div>
  );
};

export default Profile;
```


