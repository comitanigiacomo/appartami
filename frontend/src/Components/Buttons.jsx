import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export function Buttons({ isLoggedIn }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleStartNow = () => {
    if (isLoggedIn) {
      navigate('/disposizioni');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/signIn');
      }, 2000); // Mostra l'alert per 2 secondi, poi reindirizza
    }
  };

  return (
    <div>
      <div className="buttons">
        <Button className="btn1" variant="primary" onClick={handleStartNow}>Inizia Ora</Button>{' '}
        <Button className="btn2" variant="outline-light">Scopri di più</Button>{' '}
      </div>
      {showAlert && (
        <div className="alert-container">
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Attenzione!</Alert.Heading>
            <p>Per favore, accedi per continuare.</p>
          </Alert>
        </div>
      )}
    </div>
  );
}
