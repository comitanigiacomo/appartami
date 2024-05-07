import React, { useState, useEffect } from 'react';

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
                    <li key={user.username}>{user.password}</li>
                ))}
            </ul>
        </>
    );
}