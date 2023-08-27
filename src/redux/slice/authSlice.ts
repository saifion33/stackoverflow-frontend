import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../Types';
import { login, signup } from '../actions/auth';


interface Istate {
    loading: boolean;
    user: null | {
        token: null | string;
        profile: IUser | null
    }
    error: string | null;
}


const storedUser = localStorage.getItem('user');

const initialState: Istate = {
    loading: false,
    user: storedUser?JSON.parse(storedUser):null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        // ************************* Signup ************************
        builder.addCase(signup.pending, (state) => {
            state.error = null;
            state.loading = true
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false,
                state.error = action.error.message || 'unknown error'
        })
        // **************** Login **************************************
        builder.addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user
            localStorage.setItem('user',JSON.stringify(action.payload.user))
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || 'unknown error'
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
