import { showAlertWithTimeout } from "../../redux/slice/alertSlice"
import { checkNetworkAndSession } from "../../utils/helpers"
import { useNavigate, useParams } from "react-router-dom"
import AnswerContainer from "../Answer/AnswersContainer"
import QuestionDetailsCard from "./QuestionDetailsCard"
import { useAppDispatch } from "../../redux-hooks"
import userIcon from '../../assets/user-icon.svg'
import { useEffect, useState } from "react"
import { getQuestionApi } from "../../Api"
import { IQuestion } from "../../Types"
import NoInternet from "../NoInternet"
import copy from 'copy-to-clipboard'
import Timeago from 'react-timeago'
import Loading from "../Loading"

const Question = () => {
  const [question, setQuestion] = useState<null | IQuestion>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  const handleCopy = () => {
    const questionLink = window.location.href
    const onCopySuccess = () => {
      dispatch(showAlertWithTimeout({ message: 'Question Link copied.', type: 'info' }))
    }
    copy(questionLink, { onCopy: onCopySuccess })
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
          <div className="flex justify-between items-end">
            <div>
              <button onClick={handleCopy} className="text-sm text-gray-500">Share</button>
            </div>
            <div>
              <div className="text-xs text-gray-500">Asked {new Date(question.askedOn).toLocaleString('en-IN', { month: 'short', day: '2-digit' })} at {new Date(question.askedOn).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
              <div className="flex gap-2">
                <div>
                  {question.author.imageUrl && <img className="w-10" src={question.author.imageUrl} alt="user image" />}
                  {!question.author.imageUrl && <img className="w-10" src={userIcon} alt="user icon" />}
                </div>
                <div className="text-sm">
                  <p role="button" onClick={() => navigate(`/users/${question.author._id}`)} className="text-blue-500">{question.author.displayName}</p>
                  <p>{question.author.reputation}</p>
                </div>
              </div>
            </div>
          </div>
          <AnswerContainer questionAuthorId={question.author._id} />
        </div>
      }

      {loading && <Loading />}
      {(!loading && !question && !navigator.onLine) && <NoInternet />}

    </section>
  )
}

export default Question