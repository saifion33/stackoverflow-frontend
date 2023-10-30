import axios from 'axios'
import {IAcceptAnswer, IAskQuestion, IDeleteAnswer, ILoginData,  IResetPassword, ISetNotificationToken, ISignupData,  IVoteAnswerData, IVoteData, IforgetPassword, ImakeCall, IpostAnswer} from '../Types'


const api=axios.create({
    baseURL:'https://stackoverflow-server-z2ci.onrender.com',
})

api.interceptors.request.use((config)=>{
    const methods=['post','patch','delete']
    if (config.method && methods.includes(config.method) && (!config.url?.includes('/auth') )) {
        const storedToken=localStorage.getItem('user')
        const token=storedToken?JSON.parse(storedToken).token:null
        if (token) {
            config.headers.Authorization=`Bearer ${token}`
        }
    }else if (config.url?.includes('/auth/loginHistory')) {
        const storedToken=localStorage.getItem('user')
        const token=storedToken?JSON.parse(storedToken).token:null
        if (token) {
            config.headers.Authorization=`Bearer ${token}`
        }
    }
   return config
})

export const signUpUser=(data:ISignupData)=>api.post('/auth/signup', data)
export const logInUser=(data:ILoginData)=>api.post('/auth/login', data)
export const forgetPasswordApi=(data:IforgetPassword)=>api.patch('/auth/forgetPassword',data)
export const resetPasswordApi=(data:IResetPassword)=>api.patch('/auth/resetPassword',data)
export const getLoginHistoryApi=()=>api.get('/auth/loginHistory')


export const getAllUsers=()=>api.get('/users/all')
export const getUserById=(userId:string)=>api.get(`/users/${userId}`)
export const updateUser=(updates:FormData)=>api.patch('/users/update',updates)

export const askQuestionApi=(questionData:IAskQuestion)=>api.post('/questions/ask',questionData)
export const deleteQuestionApi=(questionId:string)=>api.delete(`/questions/delete/${questionId}`)
export const getAllQuestionsApi=()=>api.get('/questions/all')
export const getQuestionApi=(questionId:string)=>api.get(`/questions/${questionId}`)
export const voteQuestionApi=(voteData:IVoteData)=>api.patch('/questions/vote',voteData)

export const postAnswerApi=(answerData:IpostAnswer)=>api.patch('/answers/post',answerData)
export const getAllAnswersApi=(questionId:string)=>api.get(`/answers/all/${questionId}`)
export const deleteAnswerApi=(deleteData:IDeleteAnswer)=>api.delete('/answers/delete',{data:deleteData})
export const acceptAnswerApi=(answerData:IAcceptAnswer)=>api.patch('/answers/accept',answerData)
export const voteAnswerApi=(voteData:IVoteAnswerData)=>api.patch('/answers/vote',voteData)

export const setNotificationTokenApi=(notificationData:ISetNotificationToken)=>api.patch('/notifications/setNotificationToken',notificationData)

export const makeCallApi=(data:ImakeCall)=>api.post('/calls/makeCall',data)