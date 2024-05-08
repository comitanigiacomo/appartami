import React from 'react'
import { Header } from '../../Components/Header'
import { CarouselComp } from '../../Components/CarouselComp'
import './home.css'

export function Home () {
  return (
    <div className="main">
      <CarouselComp />
      <Header />
    </div>
  )
}