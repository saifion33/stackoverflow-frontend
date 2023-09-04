import { answer, questions } from "../../utils/helpers"
import QuestionDetailsCard from "./QuestionDetailsCard"
import AnswerCard from "./AnswerCard"
import WriteAnswer from "./WriteAnswer"


const Question = () => {
  const question = questions[0]
  const { title, askedOn,noOfAnswers } = question
  return (
    <section className="">
      <header className="flex justify-between flex-wrap-reverse gap-2 py-3 border-b-2 mb-2">
        <div >
          <h1 className="text-3xl ">{title}</h1>
          <div className="text-xs">
            <p className="text-gray-600 pt-3">Asked <span className="text-gray-900">{askedOn.toLocaleDateString('en-IN')}</span></p>
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
        </div>
      </header>
      <QuestionDetailsCard question={question} />
      <div className="mt-5">
        <div className="py-3 border-t-[1px]">
          <p className="text-xl ">{noOfAnswers} answer</p>
        </div>
        <AnswerCard Answer={answer} />
      </div>
      <footer>
        <WriteAnswer/>
      </footer>
    </section>
  )
}

export default Question