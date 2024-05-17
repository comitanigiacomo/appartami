import React, { useEffect, useState } from 'react';
import './personalRoom.css';
import { Apartments } from '../../Components/Apartments';

export function PersonalRoom() {
  const [stanza, setStanza] = useState(null);

  useEffect(() => {
    const stanzaData = localStorage.getItem('stanza');
    if (stanzaData) {
      setStanza(JSON.parse(stanzaData));
    }
  }, []);

  if (!stanza) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1>Dettagli della Stanza</h1>
      <p><strong>Codice:</strong> {stanza.hash}</p>
      <p><strong>Proprietario:</strong> {stanza.owner.username}</p>
      <Apartments apartments={stanza.apartments} />
      <h2>Persone</h2>
      <ul>
        {stanza.people.map(person => (
          <li key={person._id}>{person.username} - {person.email}</li>
        ))}
      </ul>
    </div>
  );
}