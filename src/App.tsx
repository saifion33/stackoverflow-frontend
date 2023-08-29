import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Users from "./pages/Users"
import Tags from "./pages/Tags"
import PageContainer from "./components/PageContainer"
import AskQuestion from "./components/Questions/AskQuestion"
import Questions from "./pages/Questions"
import AllQuestions from "./components/Questions/AllQuestions"
import Question from "./components/Questions/Question"
import UsersList from "./components/users/UsersList"
import UserProfile from "./components/users/UserProfile"
import EditUserProfile from "./components/users/EditUserProfile"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

const App = () => {
  return (
    <main >
      <Router>
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<PageContainer><Users /></PageContainer>} >
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/users/edit/:id" element={<EditUserProfile />} />
          </Route>
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/account-recovery" element={<ForgotPassword />} />
          <Route path="/account/recover" element={<ResetPassword />} />
          <Route path="/tags" element={<PageContainer><Tags /></PageContainer>} />
          <Route path="/questions" element={<PageContainer><Questions /></PageContainer>} >
            <Route path="/questions" element={<AllQuestions />} />
            <Route path="/questions/:id" element={<Question />} />
            <Route path="/questions/ask" element={<AskQuestion />} />
          </Route>
        </Routes>
      </Router>

    </main>
  )
}

export default App