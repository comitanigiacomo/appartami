import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

export function UserProfileCard({ userData }) {
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      // Invia la richiesta al backend per aggiornare le informazioni dell'utente
      // Utilizza fetch o un'altra libreria per fare una richiesta PUT o PATCH al tuo endpoint API
      const response = await fetch('/api/user/update', {
        method: 'PUT', // o 'PATCH' a seconda della tua API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUserData)
      });
      if (response.ok) {
        console.log('Informazioni utente aggiornate con successo');
        // Puoi aggiornare l'interfaccia utente o mostrare un messaggio di successo all'utente
      } else {
        console.error('Errore durante l\'aggiornamento delle informazioni utente:', response.statusText);
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento delle informazioni utente:', error);
    }
  };

  return (
    <section className="vh-100" style={{ display: 'flex', alignItems: 'center' , backgroundColor: 'rgb(37, 29, 29)' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '150px' }} fluid />
                  <MDBTypography tag="h5">{editedUserData.username}</MDBTypography>
                  <MDBCardText>{editedUserData.role}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h4">Informations</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBInput type="text" name="username" value={editedUserData.username} onChange={handleChange} />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBInput type="text" name="phone" value={editedUserData.phone} onChange={handleChange} />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBInput type="email" name="email" value={editedUserData.email} onChange={handleChange} />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Stato</MDBTypography>
                        <MDBInput type="text" name="phone" value={editedUserData.phone} onChange={handleChange} />
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <MDBBtn onClick={handleSubmit}>Save Changes</MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
