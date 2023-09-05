import axios from 'axios'
import {IAskQuestion, ILoginForm, ISignupForm, IpostAnswer} from '../Types'


const api=axios.create({
    baseURL:'http://localhost:5000',
})

api.interceptors.request.use((config)=>{
    const methods=['post','patch','delete']
    if (config.method && methods.includes(config.method) && (!config.url?.includes('/auth') )) {
        const storedToken=localStorage.getItem('user')
        const token=storedToken?JSON.parse(storedToken).token:null
        if (token) {
            config.headers.Authorization=`Bearer ${token}`
        }
    }
   return config
})

export const signUpUser=(data:ISignupForm)=>api.post('/auth/signup', data)
export const logInUser=(data:ILoginForm)=>api.post('/auth/login', data)

export const getAllUsers=()=>api.get('/users/all')
export const getUserById=(userId:string)=>api.get(`/users/${userId}`)
export const updateUser=(updates:FormData)=>api.patch('/users/update',updates)

export const askQuestionApi=(questionData:IAskQuestion)=>api.post('/questions/ask',questionData)
export const getAllQuestionsApi=()=>api.get('/questions/all')
export const getQuestionApi=(questionId:string)=>api.get(`/questions/${questionId}`)

export const postAnswerApi=(answerData:IpostAnswer)=>api.patch('/answers/post',answerData)