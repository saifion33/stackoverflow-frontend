import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditUserProfile from "./components/users/EditUserProfile"
import AllQuestions from "./components/Questions/AllQuestions"
import { useAppDispatch, useAppSelector } from "./redux-hooks"
import AskQuestion from "./components/Questions/AskQuestion"
import UserProfile from "./components/users/UserProfile"
import PageContainer from "./components/PageContainer"
import Question from "./components/Questions/Question"
import UsersList from "./components/users/UsersList"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { logout } from "./redux/slice/authSlice"
import Questions from "./pages/Questions"
import { IJwtPayload } from "./Types"
import Signup from "./pages/Signup"
import jwtDecode from "jwt-decode"
import Login from "./pages/Login"
import Users from "./pages/Users"
import { useEffect } from "react"
import Home from "./pages/Home"
import Tags from "./pages/Tags"
import ReputationAndBadge from "./components/ReputationAndBadge"



const App = () => {
  
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.user?.token)

  const logOutAfterSessionExipred = () => {
    if (token) {
      const tokenTime = jwtDecode<IJwtPayload>(token).exp
      const currentTime = Date.now()
      const timeToexpire = tokenTime * 1000 - currentTime
      if (timeToexpire <= 0) {
        dispatch(logout())
      }
    }
  }
  useEffect(() => {
    logOutAfterSessionExipred()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Route path="/users/reputation-and-badge" element={<ReputationAndBadge/>} />
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