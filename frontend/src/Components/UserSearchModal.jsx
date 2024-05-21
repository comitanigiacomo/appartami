import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Form } from 'react-bootstrap';


export function UserSearchModal({ show, handleClose, searchQuery, setSearchQuery, searchResults, handleAddPeopleToRoom }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
  
    const handleSelectUser = (userId) => {
      setSelectedUsers(prevState =>
        prevState.includes(userId) ? prevState.filter(id => id !== userId) : [...prevState, userId]
      );
    };
  
    const handleAddSelectedUsers = () => {
      handleAddPeopleToRoom(selectedUsers);
    };
  
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
            {searchResults.map(user => (
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