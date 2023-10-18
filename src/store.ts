import usersReducer from './redux/slice/usersSlice'
import alertReducer from './redux/slice/alertSlice'
import { configureStore } from '@reduxjs/toolkit'            
import authReducer from './redux/slice/authSlice'
import questionsReducer from './redux/slice/questionsSlice'
import answersReducer from './redux/slice/answersSlice'
import notificationsReducer from './redux/slice/notificationSlice'

const store = configureStore({
    reducer: {
       auth:authReducer,
       alert:alertReducer,
       users:usersReducer,
       questions:questionsReducer,
       answers:answersReducer,
       notifications:notificationsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store