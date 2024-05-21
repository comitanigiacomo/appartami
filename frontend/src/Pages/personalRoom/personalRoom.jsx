import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';
import { ControlRoom } from '../../Components/ControlRoom';
import { AddApartmentModal } from '../../Components/AddApartmentModal';
import Alert from 'react-bootstrap/Alert';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [showAddApartmentModal, setShowAddApartmentModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stanzaData = localStorage.getItem('stanza');
    if (stanzaData) {
      setStanza(JSON.parse(stanzaData));
    }
  }, []);

  useEffect(() => {
    if (stanza) {
      localStorage.setItem('stanza', JSON.stringify(stanza));
    }
  }, [stanza]);

  const fetchStanza = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/stanza/${stanza.hash}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const updatedStanza = await response.json();
        setStanza(updatedStanza);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } else {
        throw new Error('Errore durante il recupero della stanza aggiornata');
      }
    } catch (error) {
      console.error('Errore durante il recupero della stanza aggiornata:', error);
    }
  };

  const handleAddApartment = async (apartmentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/add-apartments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apartmentData)
      });
      if (response.ok) {
        setAlertMessage('Appartamento aggiunto con successo!');
        setShowAlert(true);
        await fetchStanza(); // Recupera la stanza aggiornata dal server
        setShowAddApartmentModal(false); // Chiudi il modal dopo aver aggiunto l'appartamento
      } else {
        throw new Error('Errore durante l\'aggiunta degli appartamenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleDeleteApartment = async (deletedApartmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/delete-apartment/${deletedApartmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      //if (response.ok) {
      if (response) {
        setAlertMessage('Appartamento eliminato con successo!');
        setShowAlert(true);
        await fetchStanza(); // Remove the semicolon and add a comma here
      } else {
        throw new Error('Errore durante l\'eliminazione dell\'appartamento');
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'appartamento:', error);
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
        setAlertMessage('Utente aggiunto con successo!');
        setShowAlert(true);
        await fetchStanza(); // Recupera la stanza aggiornata dal server
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
      const response = await fetch(`/api/stanza/${stanza.hash}/participants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setParticipants(data.participants);
      } else {
        throw new Error('Errore durante la visualizzazione dei partecipanti');
      }
    } catch (error) {
      console.error('Errore durante la visualizzazione dei partecipanti:', error);
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
        setTimeout(() => {
          navigate('/');
        }, 3000); // Reindirizza dopo 3 secondi
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
      {showAlert && <Alert variant='success'>{alertMessage}</Alert>}
      <ControlRoom
        onAddApartment={() => setShowAddApartmentModal(true)}
        onAddUser={handleAddUser}
        onDeleteRoom={deleteRoom}
        onSeeParticipants={seeParticipants}
      />
        <Apartments apartments={stanza.apartments} roomHash={stanza.hash} onDeleteApartment={handleDeleteApartment} />
      <div>
        <h3>Partecipanti</h3>
        <ul>
          {participants.map(participant => (
            <li key={participant._id}>{participant.username}</li>
          ))}
        </ul>
      </div>
      <AddApartmentModal
        show={showAddApartmentModal}
        handleClose={() => setShowAddApartmentModal(false)}
        handleAddApartment={handleAddApartment}
      />
    </div>
  );
}
