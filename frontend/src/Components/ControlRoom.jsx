import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export function ControlRoom({ owner, onAddApartment, onAddUser, onSeeParticipants, onDeleteRoom }) {
  const [userIsOwner, setUserIsOwner] = useState(false);

  useEffect(() => {
    // Qui fai una chiamata all'API per ottenere l'utente loggato
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('/api/users/user/me');
        if (response.ok) {
          const data = await response.json();
          // controlla se l'utente loggato corrisponde all'owner della stanza
          setUserIsOwner(data.username === owner.username);
        } else {
          throw new Error('Errore durante il recupero dell\'utente loggato');
        }
      } catch (error) {
        console.error('Errore durante il recupero dell\'utente loggato:', error);
      }
    };

    fetchLoggedInUser();
  }, [owner.username]);

  const handleAddApartment = async () => {
    try {
      await onAddApartment();
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await onAddUser();
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli utenti:', error);
    }
  };

  const seeParticipants = async () => {
    try {
      await onSeeParticipants();
    } catch (error) {
      console.error('Errore durante la visualizzazione dei partecipanti:', error);
    }
  };

  const deleteRoom = async () => {
    try {
      await onDeleteRoom();
    } catch (error) {
      console.error('Errore durante l\'eliminazione della stanza:', error);
    }
  };

  return (
    <div className='controls'>
      <div className="buttons">
        {userIsOwner && <Button className="btn1" variant="primary" onClick={handleAddApartment}>Aggiungi Appartamento</Button>}
        {userIsOwner && <Button className="btn2" variant="outline-light" onClick={handleAddUser}>Aggiungi Utente</Button>}
        {userIsOwner && <Button className="btn2" variant="primary" onClick={seeParticipants}>Visualizza Partecipanti</Button>}
        {userIsOwner && <Button className="btn2" variant="outline-danger" onClick={deleteRoom}>Elimina Virtual Space</Button>}
        {!userIsOwner && <Button className="btn2" variant="primary" onClick={seeParticipants}>Visualizza Partecipanti</Button>}
      </div>
    </div>
  );
}
