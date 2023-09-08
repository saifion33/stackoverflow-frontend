import { createAsyncThunk } from "@reduxjs/toolkit";
import { askQuestionApi, deleteQuestionApi, getAllQuestionsApi } from "../../Api";
import { IAskQuestion, IQuestion, IServerResponse } from "../../Types";

interface IResponse extends IServerResponse {
    data: IQuestion
}
interface IAllQuestions extends IServerResponse{
    data:IQuestion[]
}

export const askQuestion = createAsyncThunk<IResponse, IAskQuestion, { rejectValue: IServerResponse }>('/questions/ask', async (questionData, thunkApi) => {

    try {
        const response = await askQuestionApi(questionData)
        return response.data as IResponse
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

export const deleteQuestion=createAsyncThunk<IServerResponse,string,{rejectValue:IServerResponse}>('/questions/delete',async(questionId,thunkApi)=>{
    try {
        const response =await deleteQuestionApi(questionId);
        return response.data
    } catch (error) {
        const errorMessage=error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})

export const getAllQuestions=createAsyncThunk<IAllQuestions,void,{rejectValue:IServerResponse}>('/questions/all',async(_,thunkApi)=>{
    try {
        const response =await getAllQuestionsApi();
        return response.data as IAllQuestions
    } catch (error) {
        const errorMessage=error as {response:{data:IServerResponse}}
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})