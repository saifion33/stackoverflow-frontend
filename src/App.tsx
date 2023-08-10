import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Signup from "./pages/Signup"
const App = () => {
  return (
    <main>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/users/signup" element={<Signup/>} />
          <Route path="/questions" element={<div>Questions</div>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App