import React from 'react'
import './home.css'
import NavBar from '../../../component/navbar/NavBar'
import HeroSection from '../../../component/Recommand/home/heroSection/HeroSection'
import CategoriesSection from '../../../component/Recommand/home/categoriesSection/CategoriesSection'
import RecipesSection from '../../../component/Recommand/home/recipesSection/RecipesSection' 

function MenuRecHome() {
  return (
    <>
    <div className="min-h-screen bg-[#FFFBF3]">
      <NavBar/>
      <HeroSection />
      <CategoriesSection />
      <RecipesSection />
    </div>
    </>
  )
}

export default MenuRecHome