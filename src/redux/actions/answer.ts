import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnswer, IDeleteAnswer, IServerResponse, IpostAnswer } from "../../Types";
import { deleteAnswerApi, getAllAnswersApi, postAnswerApi } from "../../Api";

interface IPostResponse extends IServerResponse{
    data:IAnswer
}
interface IAllResponse extends IServerResponse{
    data:{
        _id:string,
        questionId:string,
        answers:IAnswer[],
    }
}

export const postAnswer=createAsyncThunk<IPostResponse,IpostAnswer,{rejectValue:IServerResponse}>('/answers/post',async(answerData,thunkApi) => {
    try {
        const response=await postAnswerApi(answerData)
        return response.data 
    } catch (error) {
        const errorMessage = error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

export const deleteAnswer=createAsyncThunk<IServerResponse,IDeleteAnswer,{rejectValue:IServerResponse}>('/answers/delete',async(data,thunkApi)=>{
    try {
        const response=await deleteAnswerApi(data);
        return response.data
    } catch (error) {
        const errorMessage = error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

export const getAllAnswers=createAsyncThunk<IAllResponse,string,{rejectValue:IServerResponse}>('/answers/getAllAnswers', async(questionId,thunkApi)=>{
    try {
        const response=await getAllAnswersApi(questionId);
        return response.data
    } catch (error) {
        const errorMessage = error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})