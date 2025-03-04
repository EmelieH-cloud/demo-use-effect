
Innehåll:
1. Varför useEffect() i sig själv inte får vara asynkron:
2. Varför är det vanligt att definiera en asynkron metod inuti useEffect()
3. Vad kan hända om man inte har en tom dependency array på slutet 

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

### Komponenten kan bli klar innan useEffect() är klar 
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

## 2. Varför är det vanligt att definiera en asynkron metod inuti useEffect() 

När vi definierar en asynkron funktion som körs inuti useEffect, kan vi kontrollera exakt
när den körs. Eftersom useEffect är inställd på att köra en gång vid komponentens montering
(på grund av den tomma beroende-arrayen []), vet vi att den asynkrona funktionen kommer att 
köras när komponenten har laddats och att ingen annan omrendering kommer att trigga den.

Exempel:

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
  }, []);
```

### 3. Vad kan hända om man inte har en tom dependency array på slutet 

#### Scenario: En användare uppdaterar sin profil via en knapp
När användaren öppnar en sida där deras användarnamn ska hämtas från ett API,
använder vi useEffect för att göra API-anropet och uppdatera användarnamnet i state. 
Om vi inte anger en tom dependency array [] i slutet av useEffect kan detta skapa 
problem. Här är en detaljerad genomgång av vad som händer:

## 3.1 Sidan renderas
När användaren kommer till sidan för första gången, gör useEffect ett API-anrop och hämtar användarnamnet. 
Användaren ser en laddningsindikator eftersom loading sätts till true när API-anropet görs.
När svaret från kommer uppdateras användarnamnet och laddningsindikatorn försvinner. Användaren ser sitt användarnamn på skärmen.

## 3.2 Användaren uppdaterar användarnamnet 
Användaren trycker på knappen för att uppdatera användarnamnet:
Användaren trycker på en knapp som ska uppdatera användarnamnet.
Men, eftersom useEffect körs vid varje render, och ingen dependency array har angetts, kommer useEffect att köras igen direkt efter knapptrycket och renderingen.
Detta leder till att ett nytt API-anrop görs, även om användaren inte behövde ett nytt användarnamn — kanske det är samma data som hämtades vid första renderingen.
Vad användaren upplever:

## 3.3 useEffect() triggas och gör en ny hämtning från API:et 
Efter att användaren har tryckt på uppdatera-knappen, ser de laddningsindikatorn igen (eftersom loading sätts till true igen när useEffect körs på nytt).
Användaren ser att laddningsindikatorn försvinner och användarnamnet uppdateras, men egentligen är det exakt samma användarnamn som innan, eftersom ingen ny data hämtas från servern.
Detta kan upprepas varje gång användaren trycker på knappen eller gör någon annan interaktion som orsakar en render, vilket ger en känsla av att sidan flimmrar eller att något "laddar" hela tiden utan någon faktisk förändring.
Resultat på användarupplevelse:

Laddningsindikatorn visas upprepade gånger, trots att den egentligen inte borde vara nödvändig, vilket gör att sidan känns trög och oresponsiv.
API-anrop görs onödigt många gånger, vilket påverkar prestandan. Om API-anropet tar tid (t.ex. några hundradels sekunder eller mer), blir användaren frustrerad över den upprepade väntetiden utan någon förändring.
Det skapar också onödig belastning på servern, som fortsätter att ta emot API-anrop även när ingen ny data behövs.
