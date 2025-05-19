import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MenuRecHome from './page/MenuRecommand/home/index'

function App() {

  return (
   <Router>
        <Routes>
          <Route path="/" element={<MenuRecHome />} />
        </Routes>
    </Router>
    
  )
}

export default App
