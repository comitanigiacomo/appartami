import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire il caricamento

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true); // Imposta lo stato di caricamento a true prima di effettuare la richiesta

      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Se la registrazione è avvenuta con successo, reindirizza l'utente alla pagina di login
        setTimeout(() => {
          navigate('/signin');
        }, 3000); // Imposta il tempo di ritardo in millisecondi (in questo caso, 20 secondi)
      } else {
        // Gestisci eventuali errori o feedback dal backend
        const data = await response.json();
        console.error('Registration error:', data.error);
      }
    } catch (error) {
      // Gestisci eventuali errori di rete o altre eccezioni
      console.error('Error:', error);
    } finally {
      // Imposta lo stato di caricamento a false dopo il completamento della richiesta
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">Please enter your username and password</p>
              <MDBInput 
                wrapperClass='mb-4 mx-5 w-100' 
                labelClass='text-white' 
                label='Username' 
                id='username' 
                type='text' 
                size="lg" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <MDBInput 
                wrapperClass='mb-4 mx-5 w-100' 
                labelClass='text-white' 
                label='Password' 
                id='password' 
                type='password' 
                size="lg" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button variant="outline-light" onClick={handleSignUp} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>{' '}
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
