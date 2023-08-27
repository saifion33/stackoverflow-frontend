import {createSlice} from '@reduxjs/toolkit'
import { IUser } from '../../Types';
import { signup } from '../actions/auth';

interface Istate{
    loading: boolean;
    token:null|string;
    profile:IUser|null
    error:string |null;
}

const storedToken=localStorage.getItem('token');
const storedProfile=localStorage.getItem('profile');

const initialState:Istate={
    loading:false,
    token:storedToken?JSON.parse(storedToken):null,
    profile:storedProfile?JSON.parse(storedProfile):null,
    error:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signup.pending,(state)=>{
            state.error=null;
            state.loading=true
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading=false
            console.log(action.payload)
            state.profile=action.payload.user.profile
            state.token=action.payload.user.token
        })
        builder.addCase(signup.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message || 'unknown error'
        })
    }
})

export default authSlice.reducer
