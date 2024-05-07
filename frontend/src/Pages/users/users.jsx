import React, { useState, useEffect } from 'react';
import UserCard from '../../Components/UserCard'
import './users.css'

export function Users(){

    const [users, setUsers] = useState([])

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
            <h1>Lista Utenti</h1>
            <ul>
                {users.map((user) => (
                     <UserCard key={user.username} user={user} />
                ))}
            </ul>
        </>
    );
}