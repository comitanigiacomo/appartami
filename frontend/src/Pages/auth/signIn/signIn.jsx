import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './signIn.css'

export function SignIn({ updateIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        updateIsLoggedIn(true); // Aggiorna lo stato isLoggedIn a true
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const data = await response.json();
        console.error('Login error:', data.error);
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Sign In</h2>
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
              <Button variant="outline-light" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </Button>{' '}
              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  <Alert.Heading>Error!</Alert.Heading>
                  <p>Invalid credentials. Please try again.</p>
                </Alert>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
