import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../images/logo.png';

export function NavComp({ isLoggedIn, handleLogout }) {
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <img style={{ borderRadius: '50%', marginRight: '20px' }} src={image} alt="logo" />
          <Navbar.Brand href="#/">Appartami</Navbar.Brand>
          <Nav>
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
