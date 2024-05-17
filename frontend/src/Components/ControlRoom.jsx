import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export function ControlRoom({ onAddApartment, onAddUser, onSeeParticipants, onDeleteRoom }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddApartment = async () => {
    try {
      await onAddApartment();
      setAlertMessage('Appartamento aggiunto con successo!');
      setShowAlert(true);
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await onAddUser();
      setAlertMessage('Utente aggiunto con successo!');
      setShowAlert(true);
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
      setAlertMessage('Stanza eliminata con successo!');
      setShowAlert(true);
    } catch (error) {
      console.error('Errore durante l\'eliminazione della stanza:', error);
    }
  };

  return (
    <div className='controls'>
      {showAlert && <Alert variant='success'>{alertMessage}</Alert>}
      <div className="buttons">
        <Button className="btn1" variant="primary" onClick={handleAddApartment}>Aggiungi Appartamento</Button>{' '}
        <Button className="btn2" variant="outline-light" onClick={handleAddUser}>Aggiungi Utente</Button>{' '}
        <Button className="btn2" variant="primary" onClick={seeParticipants}>Visualizza Partecipanti</Button>{' '}
        <Button className="btn2" variant="outline-danger" onClick={deleteRoom}>Elimina Stanza</Button>{' '}
      </div>
    </div>
  );
}
