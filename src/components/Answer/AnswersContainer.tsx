import AnswerCard from './AnswerCard'
import { answer } from '../../utils/helpers'
import WriteAnswer from './WriteAnswer'

const AnswerContainer= () => {

    return (
        <div>
            <div className="mt-5">
                <header className="py-3 border-t-[1px]">
                    <p className="text-xl ">{} answer</p>
                </header>
                <AnswerCard Answer={answer} />
            </div>
            <footer>
                <WriteAnswer/>
            </footer>
        </div>
    )
}

export default AnswerContainer