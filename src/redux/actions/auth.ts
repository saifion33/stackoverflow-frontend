import { ILoginForm, IServerResponse, ISignupForm, IUser, IUserUpdates } from '../../Types'
import { logInUser, signUpUser, updateUser } from '../../Api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDeviceInfo } from '../../utils/helpers'

interface IResponse extends IServerResponse {
  data: {
    token: string,
    profile: IUser
  }
}

interface IUpdateResponse extends IServerResponse {
  data: IUser
}



export const signup = createAsyncThunk<IResponse, ISignupForm, { rejectValue: IServerResponse }>('/users/signup', async (data: ISignupForm, thunkApi) => {
  try {
    const signupData = { ...data, deviceInfo: await getDeviceInfo() }
    const response = await signUpUser(signupData)
    return response.data as IResponse
  } catch (error) {
    const requestError = error as { response: { data: IServerResponse } }
    return thunkApi.rejectWithValue(requestError.response.data)
  }
})

export const login = createAsyncThunk<IResponse, ILoginForm, { rejectValue: IServerResponse }>('/users/login', async (data: ILoginForm, thunkApi) => {
  try {
    const loginData = { ...data, deviceInfo: await getDeviceInfo() }
    const response = await logInUser(loginData)
    return response.data as IResponse
  } catch (error) {
    const requestError = error as { response: { data: IServerResponse } }
    return thunkApi.rejectWithValue(requestError.response.data);
  }

})

const makeFormData = (updates: IUserUpdates) => {
  const fd = new FormData();
  if (updates.displayName) {
    fd.append('displayName', updates.displayName);
  }
  if (updates.about) {
    fd.append('about', updates.about);
  }
  if (updates.location) {
    fd.append('location', updates.location);
  }
  if (updates.image) {
    fd.append('image', updates.image);
  }
  if (updates.tags) {
    fd.append('tags', updates.tags);
  }
  return fd;
}

export const updateUserProfile = createAsyncThunk<IUpdateResponse, IUserUpdates, { rejectValue: IServerResponse }>('/users/update', async (updates, thunkApi) => {
  const formdata = makeFormData(updates)
  try {
    const response = await updateUser(formdata)
    return response.data as IUpdateResponse
  } catch (error) {
    const requestError = error as { response: { data: IServerResponse } }
    return thunkApi.rejectWithValue(requestError.response.data);
  }
})



