import usersReducer from './redux/slice/usersSlice'
import alertReducer from './redux/slice/alertSlice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slice/authSlice'
const store = configureStore({
    reducer: {
       auth:authReducer,
       alert:alertReducer,
       users:usersReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store