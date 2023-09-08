import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../Types";
import { askQuestion, deleteQuestion, getAllQuestions } from "../actions/questions";

interface IState {
    loading: boolean
    questions: IQuestion[] | null
    error: null | string
    isDeleting: boolean
}

const initialState: IState = {
    loading: false,
    questions: null,
    error: null,
    isDeleting: false
}

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ****************** Ask Question ************************************
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
         // ****************** Ask Question ************************************
         builder.addCase(deleteQuestion.pending, (state) => {
            state.error = null;
            state.isDeleting=true;
        })
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isDeleting = false;
            if (state.questions) {
                state.questions=state.questions.filter(question=>question._id!==action.meta.arg)
            }
        })
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            state.isDeleting = false;
            state.error=action.payload?.message || action.error.message || 'Unknown Error occurred.'
        })

        // ****************************** Get All Questions ****************************
        builder.addCase(getAllQuestions.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(getAllQuestions.fulfilled,(state,action)=>{
            state.loading=false;
            state.questions=action.payload.data
        })
        builder.addCase(getAllQuestions.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || action.error.message || 'Unknown Error';
        })
    }
})

export default questionsSlice.reducer