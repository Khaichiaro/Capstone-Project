import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommand/home/index'
import FoodRecordForm from './page/FoodRecordForm/foodrecordform'
import FoodHistory from './page/FoodRecordForm/home'
import EditFood from './page/FoodRecordForm/edit/editfoodform.tsx'

function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
          <Route path="/foodintake" element={<FoodRecordForm />} />
          <Route path="/foodhistory" element={<FoodHistory />} />
          <Route path="/editfood" element={<EditFood />} />
        </Routes>
    </Router>
    
  )
}

export default App
