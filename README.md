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

1. Rendering innan data är hämtad
Om useEffect var asynkron och vi utförde ett API-anrop eller någon annan asynkron operation direkt i useEffect,
 skulle komponenten kunna renderas innan datan är hämtad.

Teoretisk situation:
Anta att vi har en komponent som hämtar användarens profilinformation från en server via ett API. Om useEffect är asynkron,
kan renderingen av komponenten (och visningen av data som hämtas via API:et) hända innan den är klar. Här är ett exempel på det:
