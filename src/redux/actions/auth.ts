import { createAsyncThunk } from '@reduxjs/toolkit'
import { logInUser, signUpUser } from '../../Api'
import { ILoginForm, IServerResponse, ISignupForm, IUser } from '../../Types'

interface IResponse extends IServerResponse {
    data: {
        token: string,
        profile: IUser
    }
}


export const signup = createAsyncThunk<IResponse,ISignupForm,{rejectValue:IServerResponse}>('/users/signup', async (data: ISignupForm,thunkApi) => {
  try {
    const response = await signUpUser(data)
    return response.data as IResponse
  } catch (error) {
    const requestError = error as {response:{data:IServerResponse}}
    return thunkApi.rejectWithValue(requestError.response.data)
  }
})

export const login = createAsyncThunk<IResponse, ILoginForm, { rejectValue: IServerResponse }>('/users/login', async (data: ILoginForm, thunkApi) => {
    try {
        const response = await logInUser(data)
        return response.data as IResponse
    } catch (error) {
        const requestError = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(requestError.response.data );
    }

})

