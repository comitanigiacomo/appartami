import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ParticipantsModal({ show, handleClose, participants, handleRemoveParticipant }) {
  const handleRemove = (participantId) => {
    handleRemoveParticipant(participantId);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Partecipanti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {participants.map(participant => (
            <li key={participant._id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <span style={{ marginRight: '10px' }}>{participant.username}</span>
              <Button variant="danger" size="sm" onClick={() => handleRemove(participant._id)}>Elimina</Button>
            </li>
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
