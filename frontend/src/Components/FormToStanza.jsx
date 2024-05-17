import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function FormToStanza() {
  const [roomCode, setRoomCode] = useState('');

  // Dichiara navigate per il reindirizzamento
  const navigate = useNavigate();

  const handleRoomCodeChange = (event) => {
    setRoomCode(event.target.value);
  };

  const handleEnterCode = async () => {
    try {
      const response = await fetch(`/api/users/stanza/${roomCode}`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
        },
        credentials:'include', // Include cookies in the request
      });

      console.log(response);

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
          navigate('/my-room');
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
        <Form.Control
          type="text"
          placeholder="Enter room code"
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
        Create new room
      </Button>
    </Form>
  );
}

