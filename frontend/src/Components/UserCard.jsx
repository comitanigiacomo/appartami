import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';

function UserCard({ user }) {
  return (
    <Card border="secondary" bg="dark" style={{ width: '13rem' }}>
      <Card.Img variant="top" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp" alt="User Avatar" className="rounded-circle" />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          frase ad effetto
        </Card.Text>
        <Button variant="primary">view profile</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;