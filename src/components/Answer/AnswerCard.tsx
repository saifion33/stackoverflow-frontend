import { IAnswer } from "../../Types"
import Votes from "../Questions/Votes"
import userIcon from '../../assets/user-icon.svg'

interface Iprops{
    Answer:IAnswer
}

const AnswerCard = ({Answer}:Iprops) => {
    const {body,downVote,upVote,answerOn,author} =Answer
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
                        <p className="">{author.displayName}</p>
                    </div>
                    <p className="text-gray-500">answer  {answerOn}</p>
                </div>
            </div>
        </div>
    )
}

export default AnswerCard