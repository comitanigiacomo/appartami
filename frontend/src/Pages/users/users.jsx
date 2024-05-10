import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UsersGridCards } from '../../Components/UsersGridCards';
import './users.css';

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Ottieni il token JWT dal localStorage

        // Effettua la richiesta al backend per ottenere gli utenti utilizzando Axios
        const response = await axios.get('/api/users/getUsers', {
          headers: {
            'Authorization': `Bearer ${token}` // Includi il token nell'header Authorization
          }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Errore nel recupero degli utenti:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="listaUtenti">
        <div><h1><p>Lista Utenti</p></h1></div>
      </div>
      <div className="userCards">
        {users.length > 0 ? (
          <UsersGridCards users={users} />
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </>
  );
}
