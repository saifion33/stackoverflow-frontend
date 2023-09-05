import { IAnswer } from "../../Types"
import Votes from "../Questions/Votes"
import userIcon from '../../assets/user-icon.svg'
import TimeAgo from 'react-timeago'
import { useNavigate } from "react-router-dom"

interface Iprops{
    Answer:IAnswer
}

const AnswerCard = ({Answer}:Iprops) => {
    const {body,downVote,upVote,answeredOn,author} =Answer
    const navigate=useNavigate()
    return (
        <div className="">
            <div className="flex gap-2">
                <Votes votes={upVote.length-downVote.length} onUpvote={()=>alert('upvoted')} onDownvote={()=>alert('downvoted')} />
                <div>{body}</div>
            </div>
            <div>
                <div className="flex justify-end gap-1 mt-2 text-sm ml-auto">
                    <div className="flex gap-1 text-blue-500">
                        {author.imageUrl && <img className="w-5 h-5 rounded-sm" src={author.imageUrl} alt="user profile" />}
                        {!author.imageUrl && <img className="w-5 h-5" src={userIcon} alt="user icon"/>}
                        <p onClick={()=>navigate(`/users/${author._id}`)} className="cursor-pointer">{author.displayName}</p>
                    </div>
                    <p  className="text-gray-500">answer <TimeAgo date={answeredOn} />  </p>
                </div>
            </div>
        </div>
    )
}

export default AnswerCard