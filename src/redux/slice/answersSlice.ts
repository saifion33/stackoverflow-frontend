import { createSlice } from "@reduxjs/toolkit";
import { IAnswer } from "../../Types";
import { getAllAnswers, postAnswer } from "../actions/answer";

interface IState{
    loading: boolean;
    isPosting: boolean;
    answers:IAnswer[] | null;
    error:null | string;
}

const initialState:IState={
    loading:false,
    isPosting:false,
    answers:null,
    error:null
}

const answersSlice=createSlice({
    name:'answers',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // *************************** POST ANSWER *************************************
        builder.addCase(postAnswer.pending,state=>{
            state.isPosting=true;
            state.error=null;
        })
        builder.addCase(postAnswer.fulfilled,(state,action)=>{
            state.isPosting=false;
            if (state.answers) {
                state.answers.push(action.payload.data)
            }else{
                state.answers=[action.payload.data]
            }
        })
        builder.addCase(postAnswer.rejected,(state,action)=>{
            state.isPosting=false;
            state.error=action.payload?.message || action.error.message || 'Unknown Error';
        })
        // **************************** GET ALL ANSWERS ********************************************
        builder.addCase(getAllAnswers.pending,state=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(getAllAnswers.fulfilled,(state,action)=>{
            state.loading=false;
            state.answers=action.payload.data.answers
        })
        builder.addCase(getAllAnswers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || action.error.message || 'Unknown Error'
        })
    }
})

export default answersSlice.reducer