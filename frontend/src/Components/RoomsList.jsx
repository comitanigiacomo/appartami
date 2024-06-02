import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState('');

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
    <Tab.Container id="list-group-tabs-example" activeKey={activeRoom}>
      <Row  className="justify-content-md-center" >
        <Col sm={6}>
          <ListGroup>
            {rooms.map(room => (
              <ListGroup.Item
                key={room._id}
                action
                href={`#link${room.hash}`}
                onClick={() => setActiveRoom(`#link${room.hash}`)}
              >
                {room.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Tab.Container>
  );
}