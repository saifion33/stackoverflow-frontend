import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Users from "./pages/Users"
import Tags from "./pages/Tags"
import PageContainer from "./components/PageContainer"
import AskQuestion from "./pages/AskQuestion"
const App = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<PageContainer><Users /></PageContainer>} />
          <Route path="/tags" element={<PageContainer><Tags /></PageContainer>} />
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/questions" element={<div>Questions</div>} />
          <Route path="/questions/ask" element={<AskQuestion/>} />
        </Routes>
      </Router>
    </main>
  )
}

export default App