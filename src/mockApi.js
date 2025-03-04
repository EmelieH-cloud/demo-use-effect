

// Denna funktion simulerar ett API-anrop för att hämta användarnamn
export const fetchUsernameFromApi = () => 
{
  return new Promise((resolve, reject) => 
  {
    setTimeout(() => {
      const mockData = { username: 'JohnDoe' };
      resolve(mockData);
    }, 2000);  // Fördröjning på 2 sekunder
  });
};
