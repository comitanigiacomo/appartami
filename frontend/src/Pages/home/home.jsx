import React from 'react';
import Zigzag from '../../Components/Zigzag';
import { Buttons } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Testimonials from '../../Components/Testimonials';
import { useOutletContext } from 'react-router-dom';
import './home.css';

export function Home() {
  const { isLoggedIn } = useOutletContext();
  
  return (
    <div>
      <div className='content1'>
        <Header />
        <Buttons isLoggedIn={isLoggedIn} />
        <Zigzag />
      </div>
      <div className='testimonials'>
        <Testimonials />
      </div>
    </div>
  );
}
