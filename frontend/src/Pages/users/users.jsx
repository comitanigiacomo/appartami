import React, { useState, useEffect } from 'react';
import UsersGridCards from '../../Components/UsersGridCards';
import './users.css';

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/getUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Errore nel recupero degli utenti:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="listaUtenti">
        <h1><p>Lista Utenti</p></h1>
      </div>
      <div className="userCards">
        <UsersGridCards users={users} />
      </div>
    </>
  );
}

