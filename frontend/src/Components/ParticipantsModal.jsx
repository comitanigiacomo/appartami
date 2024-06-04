import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function ParticipantsModal({ show, handleClose, participants, handleRemoveParticipant }) {
  const [userIsOwner, setUserIsOwner] = useState(false);

  useEffect(() => {
    // Qui fai una chiamata all'API per ottenere l'utente loggato
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('/api/users/user/me');
        if (response.ok) {
          const data = await response.json();
          // Controlla se l'utente loggato è l'owner della stanza
          setUserIsOwner(data.username === participants[0].username);
        } else {
          throw new Error('Errore durante il recupero dell\'utente loggato');
        }
      } catch (error) {
        console.error('Errore durante il recupero dell\'utente loggato:', error);
      }
    };

    fetchLoggedInUser();
  }, [participants]);

  const handleRemove = (participantId) => {
    if (!userIsOwner) {
      handleRemoveParticipant(participantId);
    }
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
              {userIsOwner && participant._id !== participants[0]._id && (
                <Button variant="danger" size="sm" onClick={() => handleRemove(participant._id)}>
                  Elimina
                </Button>
              )}
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
