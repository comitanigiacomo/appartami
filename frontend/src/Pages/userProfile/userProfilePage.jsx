import { useEffect, useState } from 'react';
import { UserProfileCard } from '../../Components/UserProfileCard';
import './userProfile.css';

export function UserProfilePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {                

                // Effettua una richiesta al backend per ottenere i dati dell'utente utilizzando le informazioni contenute nel token
                const response = await fetch(`/api/users/user/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Se necessario, includi il token nell'header per l'autenticazione
                        // 'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else {
                    console.error('Errore durante il recupero dei dati dell\'utente:', response.statusText);
                }
            } catch (error) {
                console.error('Errore durante il recupero dei dati dell\'utente:', error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div className='main'>
            {userData && <UserProfileCard userData={userData} />}
        </div>
    );
}
