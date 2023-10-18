import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { getAllQuestions } from '../../redux/actions/questions'
import { checkNetworkAndSession } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import { useEffect } from 'react'
import NoInternet from '../NoInternet'
import Loading from '../Loading'

const AllQuestions = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { loading, questions } = useAppSelector(state => state.questions)
    const getAllQuestionsFunction = async () => {
        const response = await dispatch(getAllQuestions())
        if (getAllQuestions.rejected.match(response)) {
            console.log(response.payload?.message)
            dispatch(showAlertWithTimeout({ message: response.payload?.message || 'Something went wrong', type: 'error' }))
        }
    }
    useEffect(() => {
        checkNetworkAndSession('network', () => getAllQuestionsFunction())
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="flex justify-between p-3">
                <h1 className="text-2xl">All Questions</h1>
                <button onClick={() => navigate('/questions/ask')} className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
            </div>
            <div className="">
                {
                    (questions && !loading) && questions.map(question => <QuestionCard key={question._id} question={question} />)
                }
            </div>
            {
                (!loading && (!questions || questions.length <= 0)) && <div className='text-3xl text-gray-700 py-6 text-center'>
                    0 Questions
                </div>
            }
            {
                loading && <Loading />
            }
            {
                (!loading && !questions && !navigator.onLine) && <NoInternet />
            }
        </>
    )
}

export default AllQuestions