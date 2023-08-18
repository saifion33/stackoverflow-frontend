import {questions} from '../../utils/helpers'
import QuestionCard from './QuestionCard'

const AllQuestions = () => {
    return (
        <>
            <div className="flex justify-between p-3">
                <h1 className="text-2xl">All Questions</h1>
                <button className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
            </div>
            <div className="">
                {
                    questions.map(question => <QuestionCard key={question.id} question={question} />)
                }
            </div>

        </>
    )
}

export default AllQuestions