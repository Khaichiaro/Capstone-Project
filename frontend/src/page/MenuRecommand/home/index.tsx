import React from 'react'
import './home.css'
import NavBar from '../../../component/navbar/NavBar'
import SlideCard from '../../../component/slideCard/SlideCard'

function MenuRecHome() {
  return (
    <>
    <div className='home-container'>
        <NavBar />
        <SlideCard/>
    </div>
    </>
  )
}

export default MenuRecHome