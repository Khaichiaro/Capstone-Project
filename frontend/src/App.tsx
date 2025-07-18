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
import EditFoodRecommend from './page/MenuRecommend/edit/index.tsx'


import ExerciseForm from './page/ExerciseRecord/ExerciseForm/index.tsx';
import ExerciseRecord from './page/ExerciseRecord/exerciserecord.tsx'
import ExerciseActivityRecord from './page/ExerciseRecord/ExerciseActivityRecord/index.tsx'
import SelectExerciseType from './page/ExerciseRecord/SelectExerciseType/index.tsx'

function App() {
  localStorage.setItem("user_id", "1")
  console.log("user_id: ", localStorage.getItem("user_id"));

  return (
  <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
          <Route path="/usrecommend" element={<UserFoodRecommendation/>}/>
          <Route path="/recommend/edit/:id" element={<EditFoodRecommend />} />
      
          <Route path="/foodintake" element={<FoodRecordForm />} />
          <Route path="/foodhistory" element={<FoodHistory />} />
          <Route path="/eatingdetail" element={<EatingDetail />} />
          <Route path="/create/recommand" element={<CreateRecommend />} />
          <Route path="/recipe/:recipeName" element={<FoodDetailPage />} />
          <Route path='/editfoodform' element={<EditEatingform />} />

          <Route path="/exerciserecord" element={<ExerciseRecord />} />
          <Route path="/exerciseactivityrecord" element={<ExerciseActivityRecord />} />
          <Route path="/selectexercisetype" element={<SelectExerciseType />} />
          <Route path="/exercise-form" element={<ExerciseForm />} />
          
        </Routes>
    </Router>
  )
}

export default App;
