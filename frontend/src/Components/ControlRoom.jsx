import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export function ControlRoom({ onAddApartment, onAddUser }) {
  const [showAlert, setShowAlert] = useState(false);
  
  const handleAddApartment = async () => {
    try {
      await onAddApartment();
      setShowAlert(true);
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli appartamenti:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await onAddUser();
      setShowAlert(true);
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli utenti:', error);
    }
  };

  return (
    <div className='controls'>
      {showAlert && <Alert variant='success'>Operazione completata con successo!</Alert>}
      <div className="buttons">
        <Button className="btn1" variant="primary" onClick={handleAddApartment}>Aggiungi Appartamento</Button>{' '}
        <Button className="btn2" variant="outline-light" onClick={handleAddUser}>Aggiungi Utente</Button>{' '}
      </div>
    </div>
  );
}
