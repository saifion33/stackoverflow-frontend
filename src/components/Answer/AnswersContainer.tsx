import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'    
import { checkNetworkAndSession } from '../../utils/helpers'
import { getAllAnswers } from '../../redux/actions/answer'
import { useEffect,useCallback } from 'react'
import { useParams } from 'react-router-dom'
import WriteAnswer from './WriteAnswer'
import AnswerCard from './AnswerCard'

interface IProps{
    questionAuthorId: string
}
const AnswerContainer = ({questionAuthorId}:IProps) => {
    const { id } = useParams()
    const { answers, loading } = useAppSelector(state => state.answers)
    const dispatch = useAppDispatch()
    const getAllAnswersFunction =useCallback( async (questionId: string | undefined) => {
        if (questionId) {
            const res = await dispatch(getAllAnswers(questionId))
            if (getAllAnswers.rejected.match(res)) {
                dispatch(showAlertWithTimeout({ message: res.payload?.message || 'Something went wrong', type: 'warning' }))
            }
        }
    },[dispatch])

    useEffect(() => {
        checkNetworkAndSession('network', () => getAllAnswersFunction(id))
    }, [id,getAllAnswersFunction])

    return (
        <div>
            <div className="mt-5">
                <header className="py-3 border-t-[1px]">
                    <p className="text-xl ">{!answers ? 0 : answers?.length} answer</p>
                </header>
                {
                    (answers && !loading) && answers.map(answer => <AnswerCard key={answer._id} Answer={answer} questionAuthorId={questionAuthorId} />)
                }
            </div>
            <footer>
                {id && <WriteAnswer questionId={id} questionAuthorId={questionAuthorId} />}
            </footer>
        </div>
    )
}

export default AnswerContainer