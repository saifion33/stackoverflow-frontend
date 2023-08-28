import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/slice/authSlice'
import alertReducer from './redux/slice/alertSlice'
const store = configureStore({
    reducer: {
       auth:authReducer,
       alert:alertReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store