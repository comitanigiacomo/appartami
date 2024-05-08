import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export function NavComp() {
    return (
      <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#userProfile">UserProfile</Nav.Link>
          </Nav>
          <Nav>
            <Button href="#signIn" variant="outline-light">Sign in</Button>{' '}
            <Button variant="outline-light">Sign up</Button>{' '}
          </Nav>
        </Container>
      </Navbar>
     </>
    )
}