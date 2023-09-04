import { createAsyncThunk } from "@reduxjs/toolkit";
import { askQuestionApi } from "../../Api";
import { IAskQuestion, IQuestion, IServerResponse } from "../../Types";

interface IResponse extends IServerResponse {
    data: IQuestion
}

export const askQuestion = createAsyncThunk<IResponse, IAskQuestion, { rejectValue: IServerResponse }>('/questions/ask', async (questionData, thunkApi) => {

    try {
        const response = await askQuestionApi(questionData)
        console.log(response.data)
        return response.data as IResponse
    } catch (error) {
        const errorMessage = error as { response: { data: IServerResponse } }
        return thunkApi.rejectWithValue(errorMessage.response.data)
    }
})