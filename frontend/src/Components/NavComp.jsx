import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export function NavComp() {
    return (
      <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <img src='../images/logo.png'></img>
          <Navbar.Brand href="#/">Appartami</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#userProfile">UserProfile</Nav.Link>
          </Nav>
          <Nav> 
              <Button className='mr-3' href="#signIn" variant="primary">Sign in</Button>{' '}
              <Button className='ml-3' href="#signUp" variant="outline-light">Sign up</Button>{' '}
          </Nav>
        </Container>
      </Navbar>
     </>
    )
}