import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ParticipantsModal({ show, handleClose, participants }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Partecipanti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {participants.map(participant => (
            <li key={participant._id}>{participant.username}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}