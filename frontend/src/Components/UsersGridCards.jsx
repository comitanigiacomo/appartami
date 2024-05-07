import React from 'react';
import UserCard from './UserCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function UsersGridCards({ users }) {
  return (
    <Row xs={1} md={4} className="g-4">
      {users.map((user, idx) => (
        <Col key={idx}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
}


export default UsersGridCards;