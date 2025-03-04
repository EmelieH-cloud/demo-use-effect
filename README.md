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
