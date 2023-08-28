import { createAsyncThunk } from '@reduxjs/toolkit'
import { logInUser, signUpUser } from '../../Api'
import { ILoginForm, ISignupForm, IUser } from '../../Types'

interface IResponse {
    status: number,
    message: string,
    user: {
        token: string,
        profile: IUser
    }
}
interface IError {
    status: number,
    message: string
}

export const signup = createAsyncThunk<IResponse,ISignupForm,{rejectValue:IError}>('/users/signup', async (data: ISignupForm,thunkApi) => {
  try {
    const response = await signUpUser(data)
    return response.data as IResponse
  } catch (error) {
    const requestError = error as {response:{data:IError}}
    return thunkApi.rejectWithValue(requestError.response.data)
  }
})

export const login = createAsyncThunk<IResponse, ILoginForm, { rejectValue: IError }>('/users/login', async (data: ILoginForm, thunkApi) => {
    try {
        const response = await logInUser(data)
        return response.data as IResponse
    } catch (error) {
        const requestError = error as { response: { data: IError } }
        return thunkApi.rejectWithValue(requestError.response.data as IError);
    }

})

