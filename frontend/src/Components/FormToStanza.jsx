import React from 'react';
import { Form, Button } from 'react-bootstrap';

export function FormToStanza() {
  return (
    <Form className="w-75">
      <Form.Group className="mb-3" controlId="formBasicRoomCode">
        <Form.Label>Codice Stanza</Form.Label>
        <Form.Control type="text" placeholder="Enter room code" />
      </Form.Group>
      <Button variant="primary" type="submit" className="m-2 btn-lg">Enter code</Button>
      <Button variant="secondary" className="m-2 btn-lg">Create new room</Button>
    </Form>
  );
}
