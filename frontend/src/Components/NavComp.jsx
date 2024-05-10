import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../images/logo.png'

export function NavComp() {
  const handleLogout = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        });
        console.log(response)
        if (response.ok) {
            // Effettua il logout dall'applicazione o esegui altre azioni necessarie
            console.log('Logout effettuato con successo');
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
          <img style={{borderRadius: '50%', marginRight: '20px'}} src={image} alt="logo"></img>
            <Navbar.Brand href="#/">Appartami</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#users">Users</Nav.Link>
            </Nav>
            <Nav> 
              <Button className='mr-3' href="#signIn" variant="primary">Sign in</Button>{' '}
              <Button className='ml-3' href="#signUp" variant="outline-light">Sign up</Button>{' '}
              <Button className='ml-3' variant="outline-light" onClick={handleLogout}>Sign out</Button>{' '}
              <Nav.Link href="#userProfile">UserProfile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    )
}
