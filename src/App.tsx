import AskForNotification from "./components/Notifications/AskForNotification"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ReputationAndBadge from "./components/ReputationAndBadge"
const EditUserProfile = lazy(()=>import("./components/users/EditUserProfile"))
const AllQuestions =lazy(()=>import("./components/Questions/AllQuestions"));
import { useAppDispatch, useAppSelector } from "./redux-hooks"
const AskQuestion =lazy(()=>import("./components/Questions/AskQuestion")) 
const UserProfile=lazy(()=>import( "./components/users/UserProfile"));
import PageContainer from "./components/PageContainer"
import { ToastContainer, toast } from "react-toastify"
const Question =lazy(()=>import("./components/Questions/Question")) 
import IncomingCall from "./components/IncomingCall"
const  UsersList =lazy(()=>import("./components/users/UsersList"))
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import { logout } from "./redux/slice/authSlice"
import Navbar from "./components/Navbar/Navbar"
import { messaging } from "./firebase/firebase"
import { onMessage } from "firebase/messaging"
import { userPresence } from "./utils/helpers"
import 'react-toastify/dist/ReactToastify.css'
import Questions from "./pages/Questions"
import { IJwtPayload } from "./Types"
import Signup from "./pages/Signup"
import jwtDecode from "jwt-decode"
import Login from "./pages/Login"
import Users from "./pages/Users"
import { useEffect,lazy,Suspense } from "react"
import Home from "./pages/Home"
import Tags from "./pages/Tags"
const Video =lazy(()=>import("./pages/Video"))
// import VoipWrapper from "./pages/Voip/VoipWrapper"
// import Call from "./pages/Voip/Call"
import LoginHistory from "./pages/LoginHistory"
import Loading from "./components/Loading"

const VoipWrapper =lazy(()=>import("./pages/Voip/VoipWrapper"))
const Call =lazy(()=>import("./pages/Voip/Call"))

const App = () => {
  const isRequestNotificationModelOpen = useAppSelector(state => state.notifications.askPermission)
  const token = useAppSelector(state => state.auth.user?.token)
  const user = useAppSelector(state => state.auth.user?.profile)
  const dispatch = useAppDispatch()


  const logOutAfterSessionExipred = (): void => {
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
    const unsubUserPresence = userPresence()
    logOutAfterSessionExipred()
    const unsubscribe = onMessage(messaging, (payload) => {
      toast.info(<div>
        <h1>{payload.notification?.title}</h1>
        <p>{payload.notification?.body}</p>
      </div>)
    })
    return () => {
      unsubscribe()
      unsubUserPresence()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <main className="font-sans" >
      {isRequestNotificationModelOpen && <AskForNotification />}
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Navbar />
        {
          user && <IncomingCall fuid={user.fuid} />
        }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<PageContainer><Users /></PageContainer>} >
            <Route path="/users" element={<Suspense fallback={<Loading/>} ><UsersList /></Suspense>} />
            <Route path="/users/:id" element={<Suspense fallback={<Loading/>} ><UserProfile /></Suspense>}/>
            <Route path="/users/edit/:id" element={<Suspense fallback={<Loading/>} ><EditUserProfile/></Suspense>} />
            <Route path="/users/login-history/:id"  element={<LoginHistory/>}/>
            <Route path="/users/reputation-and-badge" element={<ReputationAndBadge />} />
          </Route>
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/account-recovery" element={<ForgotPassword />} />
          <Route path="/account/recover/:token" element={<ResetPassword />} />
          <Route path="/tags" element={<PageContainer><Tags /></PageContainer>} />
          <Route path="/questions" element={<PageContainer><Questions /></PageContainer>} >
            <Route path="/questions" element={<Suspense fallback={<Loading/>} ><AllQuestions/></Suspense>} />
            <Route path="/questions/:id" element={<Suspense fallback={<Loading/>} ><Question /></Suspense>} />
            <Route path="/questions/ask" element={<Suspense fallback={<Loading/>} ><AskQuestion /></Suspense>} />
          </Route>
          <Route path="/video" element={<Suspense fallback={<Loading/>} ><Video /></Suspense>} />
          <Route path="/voip" element={<Suspense fallback={<Loading/>} ><VoipWrapper /></Suspense>} />
          <Route path="/call/:callId/:callType/:callToken/:reciverFuid?/:reciverName?" element={<Suspense fallback={<Loading/>} ><Call/></Suspense>} />
          
        </Routes>
      </Router>
    </main>
  )
}

export default App