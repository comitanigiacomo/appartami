import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';

function UserCard({ user }) {
  return (
    <MDBListGroup style={{ width: '300px' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <img
            src='https://mdbootstrap.com/img/new/avatars/8.jpg' // Puoi cambiare l'URL con user.avatar se hai un campo per l'avatar nel tuo modello di utente
            alt=''
            style={{ width: '100px', height: '100px' }} // Riduci la dimensione dell'immagine
            className='rounded-circle'
          />
          <div className='ms-3'>
            {/* Utilizzo la proprietà username per visualizzare il nome */}
            <p className='fw-bold mb-1' style={{ fontSize: '14px' }}>{user.username}</p> {/* Riduci la dimensione del testo */}
            {/* Non hai una proprietà email nel tuo modello, quindi la rimuovo */}
          </div>
        </div>
        <MDBBtn size='sm' rounded color='link'>
          View
        </MDBBtn>
      </MDBListGroupItem>
    </MDBListGroup>
  );
}

export default UserCard;
