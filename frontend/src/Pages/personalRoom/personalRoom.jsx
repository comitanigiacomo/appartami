// PersonalRoom.js
import React, { useEffect, useState } from 'react';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';
import UserCard from '../../Components/UserCard';
import { ControlRoom } from '../../Components/ControlRoom';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);

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

  if (!stanza) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <p><strong>Codice:</strong> {stanza.hash}</p>
      <p><strong>Proprietario:</strong> {stanza.owner.username}</p>
      <ControlRoom onAddApartment={handleAddApartment} onAddUser={handleAddUser} />
      <Apartments apartments={stanza.apartments} />
      <h2>Utenti</h2>
      <div className='utenti'>
        {stanza.people.map(person => (
          <UserCard key={person._id} user={person} />
        ))}
      </div>
    </div>
  );
}
