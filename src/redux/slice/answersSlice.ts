import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer, IVoteAnswerData } from "../../Types";
import { acceptAnswer, deleteAnswer, getAllAnswers, postAnswer } from "../actions/answer";

interface IState {
    loading: boolean;
    isPosting: boolean;
    isDeleting: boolean;
    answers: IAnswer[] | null;
    error: null | string;
    markToDelete: null | string;
}

const initialState: IState = {
    loading: false,
    isPosting: false,
    isDeleting: false,
    answers: null,
    error: null,
    markToDelete: null
}

const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        voteAnswer: (state, action: PayloadAction<IVoteAnswerData>) => {
            if (state.answers) {
                const answer = state.answers.find(answer => answer._id === action.payload.id)
                if (answer) {
                    const duplicateAnswer = { ...answer }
                    const userId = action.payload.userId;
                    const answerId = action.payload.id;
                    const voteType = action.payload.voteType;
                    const isUpvoted = duplicateAnswer.upVote.includes(userId)
                    const isDownVoted = duplicateAnswer.downVote.includes(userId)
                    if (voteType === 'upVote') {
                        if (!isUpvoted) {
                            duplicateAnswer.upVote.push(userId)
                            duplicateAnswer.author.reputation += 6;
                        }
                        if (isUpvoted) {
                            duplicateAnswer.upVote = duplicateAnswer.upVote.filter(id => id !== userId)
                            duplicateAnswer.author.reputation -= 6;
                        }
                        if (isDownVoted) {
                            duplicateAnswer.downVote = duplicateAnswer.downVote.filter(id => id !== userId)
                            duplicateAnswer.author.reputation += 2;
                        }
                    } else if (voteType === 'downVote') {
                        if (!isDownVoted) {
                            duplicateAnswer.downVote.push(userId)
                            duplicateAnswer.author.reputation -= 2;
                        }
                        if (isDownVoted) {
                            duplicateAnswer.downVote = duplicateAnswer.downVote.filter(id => id !== userId)
                            duplicateAnswer.author.reputation += 2;
                        }
                        if (isUpvoted) {
                            duplicateAnswer.upVote = duplicateAnswer.upVote.filter(id => id !== userId)
                            duplicateAnswer.author.reputation -= 6;
                        }
                    }
                    state.answers=state.answers.map(answer=>{
                        if (answer._id===answerId) {
                            answer=duplicateAnswer
                        }
                        return answer
                    })
                }
            }
        }
    },
    extraReducers: (builder) => {
        // *************************** POST ANSWER *************************************
        builder.addCase(postAnswer.pending, state => {
            state.isPosting = true;
            state.error = null;
        })
        builder.addCase(postAnswer.fulfilled, (state, action) => {
            state.isPosting = false;
            if (state.answers) {
                state.answers.push(action.payload.data)
            } else {
                state.answers = [action.payload.data]
            }
        })
        builder.addCase(postAnswer.rejected, (state, action) => {
            state.isPosting = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error';
        })
        // **************************** DELETE ANSWER **********************************************
        builder.addCase(deleteAnswer.pending, (state, action) => {
            state.isDeleting = true;
            state.markToDelete = action.meta.arg.answerId
            state.error = null;
        })
        builder.addCase(deleteAnswer.fulfilled, (state, action) => {
            state.isDeleting = false;
            state.markToDelete = null;
            if (state.answers) {
                state.answers = state.answers?.filter(answer => answer._id !== action.meta.arg.answerId)
            }
        })
        builder.addCase(deleteAnswer.rejected, (state, action) => {
            state.isDeleting = false;
            state.markToDelete = null;
            state.error = action.payload?.message || action.error.message || 'Unknown Error';
        })
        // **************************** GET ALL ANSWERS ********************************************
        builder.addCase(acceptAnswer.pending, state => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(acceptAnswer.fulfilled, (state, action) => {
            state.loading = false;
            if (state.answers) {
                state.answers.map(answer => {
                    if (answer._id == action.meta.arg.answerId) {
                        answer.isAccepted = true;
                    }
                })
            }
        })
        builder.addCase(acceptAnswer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error'
        })
        // **************************** GET ALL ANSWERS ********************************************
        builder.addCase(getAllAnswers.pending, state => {
            state.loading = true;
            state.error = null;
            state.answers = null;
        })
        builder.addCase(getAllAnswers.fulfilled, (state, action) => {
            state.loading = false;
            state.answers = action.payload.data.answers
        })
        builder.addCase(getAllAnswers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message || 'Unknown Error'
        })
    }
})
export const {voteAnswer} =answersSlice.actions

export default answersSlice.reducer