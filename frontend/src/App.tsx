import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommand/home/index'
import CreateRecommand from './page/MenuRecommand/create'

function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
          <Route path="/create/recommand" element={<CreateRecommand />} />
        </Routes>
    </Router>
    
  )
}

export default App
