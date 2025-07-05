import React from 'react'
import NavBar from '../../../component/navbar/NavBar'
import HeroSection from '../../../component/recommend/home/heroSection/HeroSection'
import CategoriesSection from '../../../component/recommend/home/categoriesSection/CategoriesSection'
import RecipesSection from '../../../component/recommend/home/recipesSection/RecipesSection' 

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