import { createAsyncThunk } from '@reduxjs/toolkit'
import { signUpUser } from '../../Api'
import { ISignupForm, IUser } from '../../Types'

interface ISignupResponse {
    status: number,
    message: string,
    user: {
        token: string,
        profile: IUser
    }
}

export const signup = createAsyncThunk('/users/signup', async (data: ISignupForm) => {
    const response = await signUpUser(data)
    return response.data as ISignupResponse
})