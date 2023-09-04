import { useNavigate } from 'react-router-dom'
import {questions} from '../../utils/helpers'
import QuestionCard from './QuestionCard'

const AllQuestions = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className="flex justify-between p-3">
                <h1 className="text-2xl">All Questions</h1>
                <button onClick={()=>navigate('./ask')} className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
            </div>
            <div className="">
                {
                    questions.map(question => <QuestionCard key={question._id} question={question} />)
                }
            </div>

        </>
    )
}

export default AllQuestions