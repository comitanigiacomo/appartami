import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/home/home';
import { Users } from './Pages/users/users';
import { Layout } from './Layout';
import { SignUp } from './Pages/auth/signUp/signUp';
import { SignIn } from './Pages/auth/signIn/signIn';
import { UserProfilePage } from './Pages/userProfile/userProfilePage';
import { Disposizioni } from './Pages/disposizioni/disposizioni';
import { ToStanza } from './Pages/toStanza/toStanza';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      if (response.ok) {
        console.log('Logout effettuato con successo');
        setIsLoggedIn(false);
        window.location.reload();
      } else {
        console.error('Errore durante il logout:', response.statusText);
      }
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const updateIsLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn updateIsLoggedIn={updateIsLoggedIn} />} />
          <Route path="/disposizioni" element={<Disposizioni />} />
          <Route path="/chooseStanza" element={<ToStanza />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
