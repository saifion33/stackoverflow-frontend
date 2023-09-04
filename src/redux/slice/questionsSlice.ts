import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../Types";
import { askQuestion } from "../actions/questions";

interface IState {
    loading: boolean
    questions: IQuestion[] | null
    error: null | string
}

const initialState: IState = {
    loading: false,
    questions: null,
    error: null
}

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(askQuestion.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(askQuestion.fulfilled, (state, action) => {
            state.loading = false;
            if (state.questions) {
                state.questions.push(action.payload.data)
            }else{
                state.questions=[action.payload.data]
            }
        })
        builder.addCase(askQuestion.rejected, (state, action) => {
            state.loading = false;
            state.error=action.payload?.message || action.error.message || 'Unknown Error occurred.'
        })
    }
})

export default questionsSlice.reducer