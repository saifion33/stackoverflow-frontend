import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IQuestion, IVoteData } from "../../Types";
import { askQuestion, deleteQuestion, getAllQuestions, getQuestionById } from "../actions/questions";

interface IState {
    loading: boolean
    questions: IQuestion[] | null
    error: null | string
    isDeleting: boolean
    currentQuestion: IQuestion | null
}

const initialState: IState = {
    loading: false,
    questions: null,
    error: null,
    isDeleting: false,
    // This is used for when user open question page.
    currentQuestion: null
}

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        voteQuestion: (state, action: PayloadAction<IVoteData>) => {
            if (state.currentQuestion) {
                const duplicateQuestion = {...state.currentQuestion}
                const userId = action.payload.userId;
                const questionId = action.payload.id;
                const voteType = action.payload.voteType;
                if (duplicateQuestion && duplicateQuestion._id == questionId) {
                    const isUpvoted = duplicateQuestion.upVote.includes(userId)
                    const isDownVoted = duplicateQuestion.downVote.includes(userId)
                    if (voteType === 'upVote') {
                        if (!isUpvoted) {
                            duplicateQuestion.upVote.push(userId)
                            duplicateQuestion.author.reputation+=6;
                        }
                        if (isUpvoted) {
                            duplicateQuestion.upVote = duplicateQuestion.upVote.filter(id => id !== userId)
                            duplicateQuestion.author.reputation-=6;
                        }
                        if (isDownVoted) {
                            duplicateQuestion.downVote = duplicateQuestion.downVote.filter(id => id !== userId)
                            duplicateQuestion.author.reputation+=2;
                        }
                    }else if (voteType==='downVote'){
                        if (!isDownVoted) {
                            duplicateQuestion.downVote.push(userId)
                            duplicateQuestion.author.reputation-=2;
                        }
                        if (isDownVoted) {
                            duplicateQuestion.downVote = duplicateQuestion.downVote.filter(id => id !== userId)
                            duplicateQuestion.author.reputation+=2;
                        }
                        if (isUpvoted) {
                            duplicateQuestion.upVote = duplicateQuestion.upVote.filter(id => id !== userId)
                            duplicateQuestion.author.reputation-=6;
                        }
                    }
                }
                state.currentQuestion=duplicateQuestion
            }
        },
        
    },
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
            } else {
                state.questions = [action.payload.data]
            }
        })
        builder.addCase(askQuestion.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error occurred.'
        })
        // ****************** Delete a question ************************************
        builder.addCase(deleteQuestion.pending, (state) => {
            state.error = null;
            state.isDeleting = true;
        })
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isDeleting = false;
            if (state.questions) {
                state.questions = state.questions.filter(question => question._id !== action.meta.arg)
            }
            state.currentQuestion = null;
        })
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            state.isDeleting = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error occurred.'
        })

        // ****************************** Get All Questions ****************************
        builder.addCase(getAllQuestions.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.loading = false;
            state.questions = action.payload.data
        })
        builder.addCase(getAllQuestions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error';
        })
        // ****************************** Get A question by Id ****************************
        builder.addCase(getQuestionById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.currentQuestion = null;
        })
        builder.addCase(getQuestionById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentQuestion = action.payload.data;
        })
        builder.addCase(getQuestionById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error';
        })

    }
})
export const { voteQuestion } = questionsSlice.actions
export default questionsSlice.reducer