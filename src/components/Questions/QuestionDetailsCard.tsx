import { IQuestion, IVoteData } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { checkNetworkAndSession } from "../../utils/helpers";
import { voteQuestion } from '../../redux/slice/questionsSlice'
import Votes from "./Votes";
import { voteQuestionApi } from "../../Api";
import { showAlertWithTimeout } from "../../redux/slice/alertSlice";

interface Iprops {
    question: IQuestion;
}
const QuestionDetailsCard = ({ question }: Iprops) => {
    const { upVote: upVoteList, downVote: downVoteList, description } = question
    const userId = useAppSelector(state => state.auth.user?.profile?._id)
    const dispatch = useAppDispatch()

    const handleUpVote = () => {
        const upVoteFunction = async() => {
            if (userId) {
                const voteData: IVoteData = { id: question._id, userId, voteType: 'upVote' }
                // dispatch the vote Question reducer for imidiate change in vote count
                dispatch(voteQuestion(voteData))
                try {
                    await voteQuestionApi(voteData)
                } catch (error) {
                   const errorMessage= error as {response:{data:{message:string,status:number}}}
                    dispatch(showAlertWithTimeout({ message: errorMessage.response.data.message|| 'Something went wrong', type: 'error' }))
                    // if any error then vote count will be reset.
                    dispatch(voteQuestion(voteData))
                }
            }
        }
        checkNetworkAndSession('both', () => upVoteFunction())
    }

    const handleDownVote = () => {
        const downVoteFunction = async() => {
            if (userId) {
                const voteData: IVoteData = { id: question._id, userId, voteType: 'downVote' }
                // dispatch the vote Question reducer for imidiate change in vote count
                dispatch(voteQuestion(voteData))
                try {
                    await voteQuestionApi(voteData)
                } catch (error) {
                   const errorMessage= error as {response:{data:{message:string,status:number}}}
                    dispatch(showAlertWithTimeout({ message: errorMessage.response.data.message|| 'Something went wrong', type: 'error' }))
                    // if any error then vote count will be reset.
                    dispatch(voteQuestion(voteData))
                }
            }
        }
        checkNetworkAndSession('both', () => downVoteFunction())
    }
    return (
        <div className="flex gap-3">
            <Votes votes={upVoteList.length - downVoteList.length} onUpvote={handleUpVote} onDownvote={handleDownVote} />
            <div>{description}</div>
        </div>
    )
}

export default QuestionDetailsCard