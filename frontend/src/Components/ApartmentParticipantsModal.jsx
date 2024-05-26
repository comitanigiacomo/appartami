import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ApartmentParticipantsModal({ show, handleClose, apartmentParticipants }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Persone nell'Appartamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {apartmentParticipants && apartmentParticipants.length > 0 ? (
          <ul>
            {apartmentParticipants.map(participant => (
              <li key={participant._id}>{participant.username}</li>
            ))}
          </ul>
        ) : (
          <p>Nessun partecipante presente nell'appartamento.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
