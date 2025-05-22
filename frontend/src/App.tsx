import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommand/home/index'

import FoodRecordForm from './page/FoodRecordForm/foodrecordform'
import FoodHistory from './page/FoodRecordForm/home'
import EditFood from './page/FoodRecordForm/edit/editfoodform.tsx'

import CreateRecommand from './page/MenuRecommand/create'


function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />

          <Route path="/foodintake" element={<FoodRecordForm />} />
          <Route path="/foodhistory" element={<FoodHistory />} />
          <Route path="/editfood" element={<EditFood />} />
          <Route path="/create/recommand" element={<CreateRecommand />} />

        </Routes>
    </Router>
    
  )
}

export default App
