import QuestionCard from "../components/Questions/QuestionCard"
import RightBar from "../components/Questions/RightBar"
import { questions } from "../utils/helpers"


const Questions = () => {
    return (
        <section className="md3:p-3 p-1 md3:flex w-full " >
            <div className="w-full">
                <div className="flex justify-between p-3">
                    <h1 className="text-2xl">All Questions</h1>
                    <button className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
                </div>
                <div className="">
                    {
                        questions.map(question => <QuestionCard key={question.id} question={question} />)
                    }
                </div>
            </div>
            <RightBar />
        </section>
    )
}

export default Questions