import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserCard from './UserCard';

export function UsersGridCards({ users }) {
  return (
    <Row xs={1} md={2} className="g-4">
      {users.map((user, idx) => (
        <Col key={idx}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
}
