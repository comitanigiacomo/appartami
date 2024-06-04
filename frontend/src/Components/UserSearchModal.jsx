import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function UserSearchModal({ show, handleClose, searchQuery, setSearchQuery, searchResults, handleAddPeopleToRoom, currentParticipants }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Reset selected users when modal is closed
    if (!show) {
      setSelectedUsers([]);
    }
  }, [show]);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevState =>
      prevState.includes(userId) ? prevState.filter(id => id !== userId) : [...prevState, userId]
    );
  };

  const handleAddSelectedUsers = () => {
    handleAddPeopleToRoom(selectedUsers);
  };

  // Filter search results to exclude current participants
  const filteredResults = searchResults.filter(user => !currentParticipants.includes(user._id));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cerca e Aggiungi Utenti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Cerca utente per username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <h3>Risultati della ricerca</h3>
        <ul>
          {filteredResults.map(user => (
            <li key={user._id}>
              <Form.Check
                type="checkbox"
                label={user.username}
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleSelectUser(user._id)}
              />
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleAddSelectedUsers} disabled={selectedUsers.length === 0}>
          Aggiungi Utenti
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
