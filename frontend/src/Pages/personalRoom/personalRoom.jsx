import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';
import { ControlRoom } from '../../Components/ControlRoom';
import { AddApartmentModal } from '../../Components/AddApartmentModal';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [showAddApartmentModal, setShowAddApartmentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stanzaData = localStorage.getItem('stanza');
    if (stanzaData) {
      setStanza(JSON.parse(stanzaData));
    }
  }, []);

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
        const updatedStanza = await response.json();
        setStanza(updatedStanza);
        setShowAddApartmentModal(false); // Chiudi il modal dopo aver aggiunto l'appartamento
      } else {
        throw new Error('Errore durante l\'aggiunta degli appartamenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleDeleteApartment = (deletedApartmentId) => {
    setStanza((prevStanza) => ({
      ...prevStanza,
      apartments: prevStanza.apartments.filter(apartment => apartment._id !== deletedApartmentId)
    }));
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
