import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { getAllQuestions } from '../../redux/actions/questions'
import { checkNetworkAndSession } from '../../utils/helpers'
import noInternetIcon from '../../assets/no-internet.svg'
import loadingIcon from '../../assets/loading-icon.svg'
import { useNavigate } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import {useEffect} from 'react'

const AllQuestions = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const {loading,questions}=useAppSelector(state=>state.questions)
    const getAllQuestionsFunction=async()=>{
        const response=await dispatch(getAllQuestions())
        if (getAllQuestions.rejected.match(response)) {
            dispatch(showAlertWithTimeout({message:response.payload?.message || 'Something went wrong',type:'error'}))
        }
    }

    useEffect(()=>{
        checkNetworkAndSession('network',()=>getAllQuestionsFunction())
        // eslint-disable-next-line
    },[])
    
    return (
        <>
            <div className="flex justify-between p-3">
                <h1 className="text-2xl">All Questions</h1>
                <button onClick={()=>navigate('./ask')} className="bg-blue-500 text-stone-50 py-1 px-2 rounded">Ask Question</button>
            </div>
            <div className="">
                {
                   (questions && !loading) && questions.map(question => <QuestionCard key={question._id} question={question} />)
                }
            </div>
            {
                loading && <div className='w-full h-[80vh] flex justify-center items-center'>
                    <img src={loadingIcon} alt="loading icon" />
                </div>
            }
            {
                (!loading && (!questions || questions.length<=0)) && <div className='text-3xl text-gray-700 py-6 text-center'>
                    0 Questions
                </div>
            }
             {
                (!loading && !questions && !navigator.onLine) && <div className='flex flex-col justify-center items-center h-[70vh] '>
                    <img className='w-40' src={noInternetIcon} alt="NO Internet Icon" />
                    <p className='text-xl text-gray-500'>No Internet Connection</p>
                </div>
            }
        </>
    )
}

export default AllQuestions