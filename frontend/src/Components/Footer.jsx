import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white' custom-footer>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-3'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FontAwesomeIcon icon={faGoogle} />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FontAwesomeIcon icon={faInstagram} />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <FontAwesomeIcon icon={faGithub} />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div>
            made by jack during the small hours
        </div>
        © 2024 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;