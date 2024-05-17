import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';
import { ControlRoom } from '../../Components/ControlRoom';
import Alert from 'react-bootstrap/Alert';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stanzaData = localStorage.getItem('stanza');
    if (stanzaData) {
      setStanza(JSON.parse(stanzaData));
    }
  }, []);

  const handleAddApartment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/add-apartments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ apartmentIds: [/* inserisci gli ID degli appartamenti da aggiungere */] })
      });
      if (response.ok) {
        const updatedStanza = await response.json();
        setStanza(updatedStanza);
      } else {
        throw new Error('Errore durante l\'aggiunta degli appartamenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ peopleIds: [/* inserisci gli ID degli utenti da aggiungere */] })
      });
      if (response.ok) {
        const updatedStanza = await response.json();
        setStanza(updatedStanza);
      } else {
        throw new Error('Errore durante l\'aggiunta degli utenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli utenti:', error);
    }
  };

  const seeParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ peopleIds: [/* inserisci gli ID degli utenti da aggiungere */] })
      });
      if (response.ok) {
        const updatedStanza = await response.json();
        setStanza(updatedStanza);
      } else {
        throw new Error('Errore durante l\'aggiunta degli utenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli utenti:', error);
    }
  };

  const deleteRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setAlertMessage('Stanza eliminata con successo!');
        setShowAlert(true);
        setTimeout(() => {
          navigate('/');
        }, 1000); // Reindirizza dopo 3 secondi
      } else {
        throw new Error('Errore durante l\'eliminazione della stanza');
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione della stanza:', error);
    }
  };

  if (!stanza) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <p><strong>Codice:</strong> {stanza.hash}</p>
      <p><strong>Proprietario:</strong> {stanza.owner.username}</p>
      <ControlRoom onAddApartment={handleAddApartment} onAddUser={handleAddUser} onDeleteRoom={deleteRoom} onSeeParticipants={seeParticipants} />
      <Apartments apartments={stanza.apartments} />
    </div>
  );
}
