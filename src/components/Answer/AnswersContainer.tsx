import AnswerCard from './AnswerCard'
import { answer } from '../../utils/helpers'
import WriteAnswer from './WriteAnswer'
import { useParams } from 'react-router-dom'

const AnswerContainer= () => {
    const {id} =useParams()
    return (
        <div>
            <div className="mt-5">
                <header className="py-3 border-t-[1px]">
                    <p className="text-xl ">{} answer</p>
                </header>
                <AnswerCard Answer={answer} />
            </div>
            <footer>
               {id && <WriteAnswer questionId={id} />}
            </footer>
        </div>
    )
}

export default AnswerContainer