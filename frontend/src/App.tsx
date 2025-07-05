import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommend/home/index'

import FoodRecordForm from './page/FoodRecordForm/eatingrecordform.tsx'
import FoodHistory from './page/FoodRecordForm/home'
// import EditFood from './page/FoodRecordForm/edit/editfoodform.tsx'

import CreateRecommand from './page/MenuRecommend/create'
import FoodDetailPage from './page/MenuRecommend/detail'


function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />

          <Route path="/foodintake" element={<FoodRecordForm />} />
          <Route path="/foodhistory" element={<FoodHistory />} />
          {/* <Route path="/editfood" element={<EditFood />} /> */}
          <Route path="/create/recommand" element={<CreateRecommand />} />
          <Route path="/recipe/:title" element={<FoodDetailPage />} />
          {/* <Route path='/editfoodform' element={<EditEatingform />} /> */}
        </Routes>
    </Router>
    
  )
}

export default App
