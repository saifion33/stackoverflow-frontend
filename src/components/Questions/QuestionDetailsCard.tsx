import { IQuestion } from "../../Types";
import Votes from "./Votes";

interface Iprops {
    question: IQuestion;
}
const QuestionDetailsCard = ({ question }: Iprops) => {
    const { upVote,downVote, description } = question
    return (
        <div className="flex gap-3">
           <Votes votes={upVote.length-downVote.length} onUpvote={()=>alert('upvoted')} onDownvote={()=>alert('downvoted')} />
            <div>{description}</div>
        </div>
    )
}

export default QuestionDetailsCard