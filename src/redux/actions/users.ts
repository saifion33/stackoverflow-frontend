import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../Api";
import { IBasicUserDetails, IServerResponse} from "../../Types";


interface IResponse extends IServerResponse {
    data:IBasicUserDetails[]
}

export const getUsers=createAsyncThunk<IResponse,void,{rejectValue:IServerResponse}>('users/all',async(_,thunkApi)=>{
    try {
        const response=await getAllUsers()
        return response.data as IResponse
    } catch (error) {
        const errorMessage=error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

