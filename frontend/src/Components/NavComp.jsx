import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../images/logo.png';

export function NavComp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a token in the cookies when the component mounts
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    setIsLoggedIn(!!token); // Set isLoggedIn to true if there's a token, otherwise false
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      console.log(response);
      if (response.ok) {
        // Perform logout from the application or other necessary actions
        console.log('Logout successful');
        window.location.reload();
      } else {
        console.error('Logout error:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
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
          <Nav className="button-container">
            {/* Display different buttons based on authentication status */}
            {isLoggedIn ? (
              <>
                <Button variant="outline-light" onClick={handleLogout}>Sign out</Button>{' '}
                <Nav.Link href="#userProfile">UserProfile</Nav.Link>
              </>
            ) : (
              <>
                <Button href="#signIn" variant="primary" className="me-2">Sign in</Button>
                <Button href="#signUp" variant="outline-light">Sign up</Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
