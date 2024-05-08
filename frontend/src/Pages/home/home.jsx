import React from 'react'
import {CarouselComp} from '../../Components/CarouselComp'
import { Buttons } from '../../Components/Buttons'
import { Header } from '../../Components/Header'
import Testimonials from '../../Components/Testimonials'
import './home.css'

export function Home() {
  return (
    <div>
      <div className='content1'>
         <Header />
         <Buttons />
         <CarouselComp />
      </div>
      <div className='testimonials'>
         <Testimonials />
      </div>
    </div>
  )
}