import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import Modal from 'react-bootstrap/Modal';
import { RoomsList } from './RoomsList';
import { useState } from 'react';

export function NavComp({ isLoggedIn, handleLogout }) {

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container className="d-flex justify-content-between align-items-center"> {/* Aggiunto justify-content-between e align-items-center */}
          <div>
            <img style={{ borderRadius: '50%', marginRight: '20px' }} src={image} alt="logo" />
            <Navbar.Brand href="#/">Appartami</Navbar.Brand>
          </div>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link href="#userProfile">My Profile</Nav.Link>
                <Button className='ml-3' variant="outline-light" onClick={handleShow}>Le mie stanze</Button>{' '}
                <Button variant="outline-light" onClick={handleLogout}>Sign out</Button>{' '}
              </>
            ) : (
              <>
                <Button href="#signIn" variant="primary">
                  <FontAwesomeIcon icon={faUser} /> {/* Usa l'icona importata */}
                  Sign in
                </Button>{' '}
                <Button href="#signUp" variant="outline-light">Sign up</Button>{' '}
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Personal rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomsList />
        </Modal.Body>
      </Modal>

    </>
  );
}
