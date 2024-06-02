import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

export function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState('');
  const navigate = useNavigate();

  const handleClickRoomsName = async (roomCode) => {
    try {
      const response = await fetch(`/api/users/stanza/${roomCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const stanza = await response.json();
        console.log('Stanza trovata:', stanza);

        // Salva i dati della stanza in localStorage (o in uno stato globale come Redux)
        localStorage.setItem('stanza', JSON.stringify(stanza));

        // Reindirizza l'utente alla pagina della stanza
        navigate(`/rooms/${stanza.hash}`); // Modificato per includere l'hash della stanza
      } else {
        const error = await response.json();
        console.error('Errore:', error);
        alert(`Errore: ${error.error}`);
      }
    } catch (error) {
      console.error('Errore durante il recupero della stanza:', error);
      alert('Errore durante il recupero della stanza');
    }
  };

  useEffect(() => {
    fetch('/api/users/user/stanze')
      .then(response => response.json())
      .then(data => {
        setRooms(data);
        if (data.length > 0) {
          setActiveRoom(`#link${data[0].hash}`);
        }
      })
      .catch(error => {
        console.error('Errore durante il recupero delle stanze:', error);
      });
  }, []);

  return (
    <ListGroup>
      {rooms.map(room => (
        <ListGroup.Item
          key={room._id}
          action
          href={`#link${room.hash}`}
          onClick={() => {
            setActiveRoom(`#link${room.hash}`);
            handleClickRoomsName(room.hash);
          }}
          style={{ cursor: 'pointer' }} // Imposta il cursore su pointer
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'} // Cambia il colore di sfondo al passaggio del mouse
          onMouseLeave={(e) => e.target.style.backgroundColor = ''} // Ripristina il colore di sfondo al mouseleave
        >
          {room.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
