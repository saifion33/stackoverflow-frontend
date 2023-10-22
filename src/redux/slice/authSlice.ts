import { login, signup, updateUserProfile } from '../actions/auth';
import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store';
import { IUser } from '../../Types';
import { signOut } from 'firebase/auth';
import { auth, database } from '../../firebase/firebase';
import { ref, serverTimestamp, set } from 'firebase/database';


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
    user: (storedUser!==undefined && storedUser )? JSON.parse(storedUser) : null,
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            const uid=state.user?.profile?.fuid
            state.user = null;
            signOut(auth).then(()=>{
                const userRef=ref(database,`/status/${uid}`)
                set(userRef,{isOnline:false,last_changed:serverTimestamp()});
            })
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        // ************************* Signup ************************
        builder.addCase(signup.pending, (state) => {
            state.error = null;
            state.loading = true
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload?.message || action.error.message || 'unknown error'
        })
        // **************** Login **************************************
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'unknown error'
        })
        // ***************** Update Profile ****************
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
           if (state.user) {
            const updatedUser={profile:{...state.user?.profile,...action.payload.data},token:state.user?.token}
            state.user=updatedUser
            localStorage.setItem('user', JSON.stringify(updatedUser))
           }
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'unknown error'
        })
    }
})

export const { logout } = authSlice.actions

export const logOutAuto = (delay: number) => async (dispatch: AppDispatch) => {
    await new Promise(resolve => setTimeout(resolve, delay))
    dispatch(logout())
}

export default authSlice.reducer
