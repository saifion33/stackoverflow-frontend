import { IAnswer, IDeleteAnswer } from "../../Types"
import Votes from "../Questions/Votes"
import userIcon from '../../assets/user-icon.svg'
import TimeAgo from 'react-timeago'
import { useNavigate } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../redux-hooks"
import loadingIcon from '../../assets/loading-icon-white.svg'
import { deleteAnswer } from "../../redux/actions/answer"
import { checkNetworkAndSession } from "../../utils/helpers"
import { showAlertWithTimeout } from "../../redux/slice/alertSlice"

interface Iprops {
    Answer: IAnswer,
    questionAuthorId: string
}

const AnswerCard = ({ Answer, questionAuthorId }: Iprops) => {
    const { body, downVote, upVote, answeredOn, author, isAccepted ,_id,answerOf} = Answer
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user?.profile)
    const {isDeleting,markToDelete}=useAppSelector(state=>state.answers)
    const dispatch=useAppDispatch()
    const deleteAnswerFunction=async(data:IDeleteAnswer)=>{
        const res=await dispatch(deleteAnswer(data))
        if (deleteAnswer.fulfilled.match(res)) {
            dispatch(showAlertWithTimeout({message:'Answer deleted successfully.',type:'success'}))
        }else if(deleteAnswer.rejected.match(res)){
            dispatch(showAlertWithTimeout({message:res.payload?.message || 'Something went wrong.',type:'error'}))
        }
    }
    const handleDeleteAnswer=()=>{
       checkNetworkAndSession('both',()=>deleteAnswerFunction({answerId:_id,questionId:answerOf}))
    }
    return (
        <div className="">
            <div className="flex gap-2">
                <Votes votes={upVote.length - downVote.length} onUpvote={() => alert('upvoted')} onDownvote={() => alert('downvoted')} />
                <div>{body}</div>
            </div>
            <div className="flex justify-between items-center my-3 flex-wrap">
                {(!isAccepted && questionAuthorId === user?._id) && <button className="py-1 px-2 bg-blue-500 hover:bg-blue-600 text-stone-50 rounded text-sm">Accept Answer</button>}
                {isAccepted && <div className="text-lg text-green-500 flex items-center gap-2"><FaCheckCircle /> Accepted</div>}

                <div className="flex justify-end items-center  gap-1 mt-2 text-sm ml-auto">

                    {(author._id === user?._id && !isDeleting )&& <button onClick={handleDeleteAnswer}  className="py-2 text-gray-500 mr-3">Delete</button>}

                    {(isDeleting && markToDelete==_id) && <div className="py-1 px-2 bg-blue-500 text-stone-50 rounded">Deleting <img className="w-5 inline-block" src={loadingIcon} /></div>}

                    <div className="flex gap-1 text-blue-500">
                        {author.imageUrl && <img className="w-5 h-5 rounded-sm" src={author.imageUrl} alt="user profile" />}
                        {!author.imageUrl && <img className="w-5 h-5" src={userIcon} alt="user icon" />}
                        <p onClick={() => navigate(`/users/${author._id}`)} className="cursor-pointer">{author.displayName}</p>
                    </div>
                    <p className="text-gray-500">answer <TimeAgo date={answeredOn} />  </p>
                </div>
            </div>
        </div>
    )
}

export default AnswerCard