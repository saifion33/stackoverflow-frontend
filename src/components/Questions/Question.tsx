import { showAlertWithTimeout } from "../../redux/slice/alertSlice"
import { useAppDispatch, useAppSelector } from "../../redux-hooks"
import loadingIcon from '../../assets/loading-icon-white.svg'
import { checkNetworkAndSession } from "../../utils/helpers"
import { useNavigate, useParams } from "react-router-dom"
import AnswerContainer from "../Answer/AnswersContainer"
import QuestionDetailsCard from "./QuestionDetailsCard"
import userIcon from '../../assets/user-icon.svg'
import NoInternet from "../NoInternet"
import copy from 'copy-to-clipboard'
import Timeago from 'react-timeago'
import { useEffect,useCallback } from "react"
import Loading from "../Loading"
import { deleteQuestion, getQuestionById } from "../../redux/actions/questions"

const Question = () => {
  const { currentQuestion: question, loading, isDeleting } = useAppSelector(state => state.questions)
  const userId = useAppSelector(state => state.auth.user?.profile?._id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const getQuestionFunction = async (questionId: string) => {
    const res= await dispatch(getQuestionById(questionId))
    if (getQuestionById.rejected.match(res)) {
      dispatch(showAlertWithTimeout({message:res.payload?.message|| 'Something went wrong.',type: 'error'}))
    }
  }
  const deleteQuestionFunction = useCallback(async (questionId: string) => {
    const res = await dispatch(deleteQuestion(questionId))
    if (deleteQuestion.fulfilled.match(res)) {
      dispatch(showAlertWithTimeout({ message: "Question deleted successfully.", type: 'success' }))
      navigate('/questions')
    } else if (deleteQuestion.rejected.match(res)) {
      dispatch(showAlertWithTimeout({ message: res.payload?.message || 'Something went wrong', type: 'error' }))
    }
    // eslint-disable-next-line
  },[])

  const handleDelete = () => {
    if (question?._id) {
      checkNetworkAndSession('both', () => deleteQuestionFunction(question?._id))
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
    if (id) {
      checkNetworkAndSession('network', () => getQuestionFunction(id))
    }
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
            <div className="flex items-center gap-2">
              {(!isDeleting && question.author._id == userId) && <button onClick={handleDelete} className="text-sm text-gray-500">Delete</button>}
              {isDeleting && <div className="flex items-center gap-1 py-1 px-2 rounded bg-blue-500 text-stone-50">Deleting<img className="w-5" src={loadingIcon} alt="loading icon " /></div>}
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