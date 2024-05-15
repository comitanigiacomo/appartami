import React from 'react';
import Button from 'react-bootstrap/Button';

export function Buttons() {
    return (
        <div className="buttons">
            <Button className="btn1" variant="primary" href='#disposizioni'>Inizia Ora</Button>{' '}
            <Button className="btn2" variant="outline-light">Scopri di più</Button>{' '}
        </div>
    );
}