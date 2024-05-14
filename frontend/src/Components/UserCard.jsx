import React from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';

function UserCard({ user }) {
  return (
    <MDBListGroup style={{ minWidth: '27rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <img
            src='https://mdbootstrap.com/img/new/avatars/8.jpg' // Puoi cambiare l'URL con user.avatar se hai un campo per l'avatar nel tuo modello di utente
            alt=''
            style={{ width: '100px', height: '100px' }}
            className='rounded-circle'
          />
          <div className='ms-3'>
            {/* Utilizzo la proprietà username per visualizzare il nome */}
            <p className='fw-bold mb-1'>{user.username}</p>
            {/* Non hai una proprietà email nel tuo modello, quindi la rimuovo */}
            <p className='fw-bold mb-1'>{user.email}</p>
          </div>
        </div>
        <MDBBtn size='sm' rounded color='link'>
          View
        </MDBBtn>
      </MDBListGroupItem>
      {/* Puoi ripetere questo blocco di list group item per ciascun utente */}
    </MDBListGroup>
  );
}

export default UserCard;
