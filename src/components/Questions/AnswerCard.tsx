import { IAnswer } from "../../Types"
import Votes from "./Votes"

interface Iprops{
    Answer:IAnswer
}

const AnswerCard = ({Answer}:Iprops) => {
    const {answer,votes,answerBy,answerAt} =Answer
    return (
        <div className="">
            <div className="flex gap-2">
                <Votes votes={votes} onUpvote={()=>alert('upvoted')} onDownvote={()=>alert('downvoted')} />
                <div>{answer}</div>
            </div>
            <div>
                <div className="flex justify-end gap-1 mt-2 text-sm ml-auto">
                    <div className="flex gap-1 text-blue-500">
                        <img className="w-5 h-5 rounded-sm" src={answerBy.imageUrl} alt="user profile" />
                        <p className="">{answerBy.displayName}</p>
                    </div>
                    <p className="text-gray-500">answer  {answerAt}</p>
                </div>
            </div>
        </div>
    )
}

export default AnswerCard