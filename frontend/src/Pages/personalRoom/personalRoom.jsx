import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Dettagli della Stanza</h1>
      <p><strong>Codice:</strong> {stanza.hash}</p>
      <p><strong>Proprietario:</strong> {stanza.owner.username}</p>
      <h2>Appartamenti</h2>
      <ul>
        {stanza.apartments.map(apartment => (
          <li key={apartment._id}>{apartment.name} - {apartment.location}</li>
        ))}
      </ul>
      <h2>Persone</h2>
      <ul>
        {stanza.people.map(person => (
          <li key={person._id}>{person.username} - {person.email}</li>
        ))}
      </ul>
    </div>
  );
}
