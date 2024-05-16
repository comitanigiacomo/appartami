import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
} from 'mdb-react-ui-kit';
import { ColDxToStanza } from '../../Components/ColDxToStanza';
import { ColSxToStanza } from '../../Components/ColSxToStanza';
import { FormToStanza } from '../../Components/FormToStanza';
import './toStanza.css';

export function ToStanza() {
  return (
    <MDBContainer fluid className='p-4 p-md-5 background-radial-gradient overflow-hidden'>
      <MDBRow className="riga justify-content-center align-items-center">
        <MDBCol md='6' className='container text-center text-md-start d-flex flex-column justify-content-center p-5'>
          <ColSxToStanza />
          <ColDxToStanza />
        </MDBCol>
        <MDBCol md='6' className='position-relative p-5'>
          <MDBCard className='card-custom my-5 bg-glass text-center d-flex flex-column align-items-center p-4'>
            <FormToStanza />
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
