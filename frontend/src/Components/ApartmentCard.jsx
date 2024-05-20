import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import image from '../images/piantaAppartamento.png';

export function ApartmentCard({ name, description, roomHash, apartmentId, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/stanza/${roomHash}/delete-apartment/${apartmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        onDelete(apartmentId);
      } else {
        throw new Error('Errore durante l\'eliminazione dell\'appartamento');
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'appartamento:', error);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary">View Apartment</Button>
        <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Apartment</Button>
      </Card.Body>
    </Card>
  );
}
