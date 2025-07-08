import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommend/home/index'

// import FoodRecordForm from './page/FoodRecordForm/eatingrecordform.tsx'
import FoodHistory from './page/FoodRecordForm/home'
import EditFood from './page/FoodRecordForm/eatingdetail'
import EatingDetail from './page/FoodRecordForm/eatingdetail.tsx'
import EditEatingform from './page/FoodRecordForm/edit/editeatingform.tsx'
// import EditFood from './page/FoodRecordForm/edit/editfoodform.tsx'

import CreateRecommand from './page/MenuRecommand/create'
import FoodDetailPage from './page/MenuRecommand/detail'


function App() {
  localStorage.setItem("user_id", "2")
  console.log("user_id: ", localStorage.getItem("user_id"));

  return (
  <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
      
          {/* <Route path="/foodintake" element={<FoodRecordForm />} /> */}
          <Route path="/foodhistory" element={<FoodHistory />} />
          {/* <Route path="/editfood" element={<EditFood />} /> */}
          <Route path="/create/recommand" element={<CreateRecommand />} />
          <Route path="/recipe/:recipeName" element={<FoodDetailPage />} />
          {/* <Route path='/editfoodform' element={<EditEatingform />} /> */}
        </Routes>
    </Router>
  )
}

export default App;
