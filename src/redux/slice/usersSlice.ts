import { createSlice } from "@reduxjs/toolkit";
import { IBasicUserDetails} from "../../Types";
import {getUsers} from '../actions/users'
interface IValues{
    loading: boolean;
    users:IBasicUserDetails[] | null;
    error:string|null;
}
const initialState:IValues={
    loading:false,
    users:null,
    error:null
}

const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload.data
        })
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || action.error.message || 'unknown error'
        })
    }
})

export default usersSlice.reducer