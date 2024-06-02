import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function FormToStanza() {
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Dichiara navigate per il reindirizzamento
  const navigate = useNavigate();

  const handleRoomCodeChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleEnterCode = async () => {
    try {
      const response = await fetch(`/api/users/stanza/${roomCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const stanza = await response.json();
        console.log('Stanza trovata:', stanza);

        // Salva i dati della stanza in localStorage (o in uno stato globale come Redux)
        localStorage.setItem('stanza', JSON.stringify(stanza));

        // Reindirizza l'utente alla pagina my-room
        navigate('/my-room');
      } else {
        const error = await response.json();
        console.error('Errore:', error);
        alert(`Errore: ${error.error}`);
      }
    } catch (error) {
      console.log(error);
      console.error('Errore durante il recupero della stanza:', error);
      alert('Errore durante il recupero della stanza');
    }
  };

  const handleCreateRoom = async () => {
    setShowModal(true);
  };

  const handleConfirmCreateRoom = async () => {
    try {
      // Effettua la chiamata API per creare la stanza
      const response = await fetch('/api/users/createStanza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName }), // Invia il nome della stanza al backend
        credentials: 'include',
      });

      // Verifica se la chiamata API ha avuto successo
      if (response.ok) {
        const stanza = await response.json();
        console.log('Stanza creata:', stanza);

        // Salva i dati della stanza in localStorage (o in uno stato globale come Redux)
        localStorage.setItem('stanza', JSON.stringify(stanza));

        // Reindirizza l'utente alla pagina my-room
        navigate('/my-room');
      } else {
        console.error('Errore durante la creazione della stanza');
      }
    } catch (error) {
      console.error('Errore durante la creazione della stanza:', error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Form className="w-75">
        <Form.Group className="mb-3" controlId="formBasicRoomCode">
          <Form.Label>Codice virtual space</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter virtual space code"
            value={roomCode}
            onChange={handleRoomCodeChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          className="m-2 btn-lg"
          onClick={handleEnterCode}
        >
          Enter code
        </Button>
        <Button
          variant="secondary"
          className="m-2 btn-lg"
          onClick={handleCreateRoom}
        >
          Create new virtual space
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci il nome della stanza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formRoomName">
            <Form.Label>Nome della stanza</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleConfirmCreateRoom}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
