import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommend/home/index'


import FoodRecordForm from './page/FoodRecordForm/eatingrecordform.tsx'
import FoodHistory from './page/FoodRecordForm/home'
import EatingDetail from './page/FoodRecordForm/eatingdetail.tsx'
import EditEatingform from './page/FoodRecordForm/edit/editeatingform.tsx'

import CreateRecommend from './page/MenuRecommend/create'
import FoodDetailPage from './page/MenuRecommend/detail'
import UserFoodRecommendation from './page/MenuRecommend/user/index.tsx'


function App() {
  localStorage.setItem("user_id", "1")
  console.log("user_id: ", localStorage.getItem("user_id"));

  return (
  <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
          <Route path="/usrecommend" element={<UserFoodRecommendation/>}/>
      
          <Route path="/foodintake" element={<FoodRecordForm />} />
          <Route path="/foodhistory" element={<FoodHistory />} />
          <Route path="/eatingdetail" element={<EatingDetail />} />
          <Route path="/create/recommand" element={<CreateRecommend />} />
          <Route path="/recipe/:recipeName" element={<FoodDetailPage />} />
          <Route path='/editfoodform' element={<EditEatingform />} />
        </Routes>
    </Router>
  )
}

export default App;
