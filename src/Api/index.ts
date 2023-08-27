import axios from 'axios'
import {ISignupForm} from '../Types'
const api=axios.create({
    baseURL:'http://localhost:5000'
})

export const signUpUser=(data:ISignupForm)=>api.post('/auth/signup', data)
