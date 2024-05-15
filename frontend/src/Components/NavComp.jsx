import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../images/logo.png';

export function NavComp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Controlla se c'è un token nei cookie quando il componente si monta
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsLoggedIn(!!token); // Imposta isLoggedIn a true se c'è un token, altrimenti false
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
    });
    console.log(response)
    if (response.ok) {
        // Effettua il logout dall'applicazione o esegui altre azioni necessarie
        console.log('Logout effettuato con successo');
        window.location.reload();
    } else {
        console.error('Errore durante il logout:', response.statusText);
    }
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <img style={{ borderRadius: '50%', marginRight: '20px' }} src={image} alt="logo" />
          <Navbar.Brand href="#/">Appartami</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn && <Nav.Link href="#users">Users</Nav.Link>}
          </Nav>
          <Nav>
            {/* Mostra diversi pulsanti in base allo stato di autenticazione */}
            {isLoggedIn ? (
              <>
                <Button className='ml-3' variant="outline-light" onClick={handleLogout}>Sign out</Button>{' '}
                <Nav.Link href="#userProfile">UserProfile</Nav.Link>
              </>
            ) : (
              <>
                <Button className='mr-3' href="#signIn" variant="primary">Sign in</Button>{' '}
                <Button className='ml-3' href="#signUp" variant="outline-light">Sign up</Button>{' '}
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
