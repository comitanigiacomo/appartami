import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function FormToStanza() {
  // Dichiara navigate per il reindirizzamento
  const navigate = useNavigate();

  // Funzione per gestire la creazione della stanza
  const handleCreateRoom = async () => {
    try {
      // Effettua la chiamata API per creare la stanza
      const response = await fetch('/api/users/createStanza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica se la chiamata API ha avuto successo
      if (response.ok) {
        console.log('fatto')
        // Attendi 2 secondi prima del reindirizzamento
        setTimeout(() => {
          // Reindirizza l'utente a una nuova pagina
          navigate('/new-room');
        }, 2000);
      } else {
        console.error('Errore durante la creazione della stanza');
      }
    } catch (error) {
      console.error('Errore durante la creazione della stanza:', error);
    }
  };

  return (
    <Form className="w-75">
      <Form.Group className="mb-3" controlId="formBasicRoomCode">
        <Form.Label>Codice Stanza</Form.Label>
        <Form.Control type="text" placeholder="Enter room code" />
      </Form.Group>
      {/* Chiama handleCreateRoom al click sul pulsante */}
      <Button variant="primary" type="button" className="m-2 btn-lg">
        Enter code
      </Button>
      <Button onClick={handleCreateRoom} variant="secondary" className="m-2 btn-lg">Create new room</Button>
    </Form>
  );
}

