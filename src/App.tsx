import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <main>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/questions" element={<div>Questions</div>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App