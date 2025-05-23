import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommand/home/index'
import CreateRecommand from './page/MenuRecommand/create'
import FoodDetailPage from './page/MenuRecommand/detail'

function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
          <Route path="/create/recommand" element={<CreateRecommand />} />
          <Route path="/recipe/:title" element={<FoodDetailPage />} />
        </Routes>
    </Router>
    
  )
}

export default App
