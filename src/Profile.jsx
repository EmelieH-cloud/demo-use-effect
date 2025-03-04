import React from 'react';
import { useUsername } from './UsernameContext'; // Importera vår provider och hook

const Profile = () => {
  const { username, loading, error } = useUsername(); // Använd vår custom hook

  if (loading) {
    return <div>Laddar användarnamn...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profil</h1>
      <p>Användarnamn: {username}</p>
    </div>
  );
};

export default Profile; 
