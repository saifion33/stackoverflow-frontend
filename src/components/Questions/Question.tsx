import { checkNetworkAndSession } from "../../utils/helpers"
import { showAlertWithTimeout } from "../../redux/slice/alertSlice"
import QuestionDetailsCard from "./QuestionDetailsCard"
import { useAppDispatch } from "../../redux-hooks"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getQuestionApi } from "../../Api"
import { IQuestion } from "../../Types"
import NoInternet from "../NoInternet"
import Timeago from 'react-timeago'
import Loading from "../Loading"
import AnswerContainer from "../Answer/AnswersContainer"


const Question = () => {
  const [question, setQuestion] = useState<null | IQuestion>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const getQuestionFunction = async () => {
    setLoading(true)
    if (id) {
      getQuestionApi(id)
        .then(res => {
          setQuestion(res.data.data);
        })
        .catch(err => {
          const errMessage = err as { response: { data: { message: string, status: number } } }
          dispatch(showAlertWithTimeout({ message: errMessage.response.data.message || 'Something went wrong.', type: 'error' }))
        })
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    checkNetworkAndSession('network', () => getQuestionFunction())
    // eslint-disable-next-line
  }, [])

  return (
    <section className="">
      {
        (!loading && question) && <div>
          <header className="flex justify-between flex-wrap-reverse gap-2 py-3 border-b-2 mb-2">
            <div >
              <h1 className="text-3xl ">{question.title}</h1>
              <div className="text-xs">
                <p className="text-gray-600 pt-3">Asked <Timeago date={question.askedOn} /></p>
              </div>
            </div>
            <div>
              <button className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
            </div>
          </header>
          <QuestionDetailsCard question={question} />
          <AnswerContainer/>
        </div>
      }

      {loading && <Loading />}
      {(!loading && !question && !navigator.onLine) && <NoInternet />}

    </section>
  )
}

export default Question