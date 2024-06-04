import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';
import { ControlRoom } from '../../Components/ControlRoom';
import { AddApartmentModal } from '../../Components/AddApartmentModal';
import Alert from 'react-bootstrap/Alert';
import { UserSearchModal } from '../../Components/UserSearchModal';
import { ParticipantsModal } from '../../Components/ParticipantsModal';
import { ApartmentParticipantsModal } from '../../Components/ApartmentParticipantsModal';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [apartmentParticipants, setApartmentParticipants] = useState([]);
  const [showAddApartmentModal, setShowAddApartmentModal] = useState(false);
  const [showUserSearchModal, setShowUserSearchModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [showApartmentParticipantsModal, setShowApartmentParticipantsModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
    console.log(deletedApartmentId)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/delete-apartment/${deletedApartmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
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

  // serve per i risultati della barra di ricerca 
  const handleAddUser = useCallback(async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/search-users?searchQuery=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        throw new Error('Errore durante la ricerca degli utenti');
      }
    } catch (error) {
      console.error('Errore durante la ricerca degli utenti:', error);
    }
  }, [searchQuery]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleAddUser = useCallback(debounce(handleAddUser, 500), [handleAddUser]);

  useEffect(() => {
    debouncedHandleAddUser();
  }, [searchQuery, debouncedHandleAddUser]);

  const handleSeeParticipants = async () => {
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
        setShowParticipantsModal(true); // Apre il modal dei partecipanti dopo aver ottenuto i dati
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

  const handleAddPeopleToRoom = async (selectedUserIds) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ peopleIds: selectedUserIds })
      });
      if (response) {
        setAlertMessage('Utenti aggiunti con successo!');
        setShowAlert(true);
        await fetchStanza(); // Recupera la stanza aggiornata dal server
        setShowUserSearchModal(false); // Chiudi il modal dopo aver aggiunto gli utenti
      } else {
        throw new Error('Errore durante l\'aggiunta degli utenti');
      }
    } catch (error) {
      console.error('Errore durante l\'aggiunta degli utenti:', error);
    }
  };

  const handleRemoveParticipant = async (participantId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${stanza.hash}/removePeople`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ peopleIds: [participantId] })
      });
      if (response.ok) {
        setAlertMessage('Partecipante rimosso con successo!');
        setShowAlert(true);
        await fetchStanza(); // Aggiorna la stanza dopo la rimozione del partecipante
        // Aggiorna direttamente lo stato dei partecipanti nel modal
        setParticipants(prevParticipants => prevParticipants.filter(participant => participant._id !== participantId));
      } else {
        throw new Error('Errore durante la rimozione del partecipante');
      }
    } catch (error) {
      console.error('Errore durante la rimozione del partecipante:', error);
    }
  };
  

  const handleViewApartment = useCallback(async (apartmentId) => {    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/apartment/${apartmentId}/people`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setApartmentParticipants(data);
        setShowApartmentParticipantsModal(true); // Apre il modal dei partecipanti dopo aver ottenuto i dati
      } else {
        throw new Error('Errore durante la visualizzazione delle persone nell\'appartamento');
      }
    } catch (error) {
      console.error('Errore durante la visualizzazione delle persone nell\'appartamento:', error);
    }
  }, []);

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
        onAddUser={() => setShowUserSearchModal(true)}
        onDeleteRoom={deleteRoom}
        onSeeParticipants={handleSeeParticipants}
      />
      <Apartments 
        apartments={stanza.apartments} 
        roomHash={stanza.hash} 
        onDeleteApartment={handleDeleteApartment} 
        onViewApartment={handleViewApartment}
      />
      <AddApartmentModal
        show={showAddApartmentModal}
        handleClose={() => setShowAddApartmentModal(false)}
        handleAddApartment={handleAddApartment}
      />
      <UserSearchModal
        show={showUserSearchModal}
        handleClose={() => setShowUserSearchModal(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleAddPeopleToRoom={handleAddPeopleToRoom}
        currentParticipants={stanza.people.map(person => person._id)} // Pass current participants' IDs
      />
      <ParticipantsModal
        show={showParticipantsModal}
        handleClose={() => setShowParticipantsModal(false)}
        participants={participants}
        handleRemoveParticipant={handleRemoveParticipant}
      />
      <ApartmentParticipantsModal
        show={showApartmentParticipantsModal}
        handleClose={() => setShowApartmentParticipantsModal(false)}
        apartmentParticipants={apartmentParticipants}
      />
    </div>
  );
}
