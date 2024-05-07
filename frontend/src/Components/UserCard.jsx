import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import userImage from '../Pages/users/user.png';


function UserCard({user}) {
  return (
    <Card border="secondary" bg="dark" style={{ width: '17rem' }}>
      <Card.Img variant="top" src={userImage} />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          frase ad effetto
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;