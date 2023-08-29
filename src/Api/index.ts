import axios from 'axios'
import {ILoginForm, ISignupForm} from '../Types'
const api=axios.create({
    baseURL:'http://localhost:5000'
})

export const signUpUser=(data:ISignupForm)=>api.post('/auth/signup', data)
export const logInUser=(data:ILoginForm)=>api.post('/auth/login', data)

export const getAllUsers=()=>api.get('/users/all')
