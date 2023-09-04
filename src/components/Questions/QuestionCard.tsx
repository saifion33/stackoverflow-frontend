import { useNavigate } from "react-router-dom";
import { IQuestion } from "../../Types"

interface Iprops{
    question:IQuestion
}

const QuestionCard = ({question}:Iprops) => {
    const {title,description,tags,askedOn,author,upVote,downVote,noOfAnswers}=question;
    const date=new Date(askedOn)
    const navigate=useNavigate()
  return (
    <div className="border-b-[1px] p-3 md3:flex md3:gap-2 md3:flex-wrap">
        <div className="flex md3:flex-col gap-2 text-sm">
            <p>{upVote.length-downVote.length} votes</p>
            <p>{noOfAnswers} answer</p>
        </div>
        <div className="space-y-2">
            <h2 className="text-blue-500">{title}</h2>
            <p className="text-xs">{description}</p>
            <div className="flex flex-wrap gap-1 text-xs">
                {
                    tags.split(',').map(tag=><span className="border-[1px] border-blue-500 bg-blue-50 rounded py-[2px] px-2 " key={tag} >{tag}</span>)
                }
            </div>
        </div>
        <div className="flex justify-end gap-1 mt-2 text-sm ml-auto">
            <div className="flex gap-1 text-blue-500">
                <img className="w-5 h-5 rounded-sm" src={author.imageUrl} alt="user profile" />
                <p role="link" onClick={()=>navigate(`/users/${author._id}`)}  className="cursor-pointer">{author.displayName}</p>
            </div>
            <p className="text-gray-500">asked {date.toLocaleString('en-IN',{month:'short',year:'numeric'})} at {date.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})}</p>
        </div>
    </div>
  )
}

export default QuestionCard