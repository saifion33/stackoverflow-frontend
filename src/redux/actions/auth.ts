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

export const signup = createAsyncThunk('/users/signup', async (data: ISignupForm) => {
    const response = await signUpUser(data)
    return response.data as IResponse
})

export const login=createAsyncThunk('/users/login', async (data: ILoginForm) => {
    const response = await logInUser(data);
    return response.data as IResponse
})