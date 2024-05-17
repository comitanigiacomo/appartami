import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function AddApartmentModal({ show, handleClose, handleAddApartment }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBeds, setNumberOfBeds] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddApartment({ name, location, numberOfBeds });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Appartamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formApartmentName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formApartmentLocation">
            <Form.Label>Località</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNumberOfBeds">
            <Form.Label>Numero di Letti</Form.Label>
            <Form.Control
              type="number"
              value={numberOfBeds}
              onChange={(e) => setNumberOfBeds(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Aggiungi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
