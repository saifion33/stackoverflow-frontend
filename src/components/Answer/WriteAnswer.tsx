import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { postAnswer } from '../../redux/actions/answer';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { IpostAnswer } from '../../Types';
import { string, object } from 'yup'
import { checkNetworkAndSession } from '../../utils/helpers';
import loadingIcon from '../../assets/loading-icon-white.svg'

interface Iprops {
    questionId: string
}
interface IAns {
    answerBody: string;
}
const validationSchema = object({
    answerBody: string().min(20, 'minimum 20 characters is required').required('answer is required'),
})
const WriteAnswer = ({ questionId }: Iprops) => {
    const initialValues: IAns = {
        answerBody: ''
    }
    const dispatch = useAppDispatch()
    const isPosting = useAppSelector(state => state.answers.isPosting)
    const postAnswerFunction = async (answerData: IpostAnswer) => {
        const res = await dispatch(postAnswer(answerData))
        if (postAnswer.fulfilled.match(res)) {
            dispatch(showAlertWithTimeout({ message: 'Answer posted successfully.', type: 'success' }))
        }
        else if (postAnswer.rejected.match(res)) {
            dispatch(showAlertWithTimeout({ message: res.payload?.message || 'something went wrong', type: 'error' }))
        }
    }

    const handleSubmit = async (values: IAns) => {
        const answerData = { ...values, questionId }
        checkNetworkAndSession('both', () => postAnswerFunction(answerData))
    }

    return (
        <div className="px-3">
            <h1 className="text-2xl py-3">Your Answer</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                <Form>
                    <Field name="answerBody" component={'textarea'} rows={5} className="w-full p-3 border-[1px] outline-none focus:outline focus:outline-4 focus:outline-blue-100 rounded" />
                    <ErrorMessage name='answerBody' className='text-red-600' component={'div'} />
                   { !isPosting && <button type="submit" className="bg-blue-500 text-stone-50 py-1 px-2 mt-4 rounded">Post Your Answer</button>}
                   {isPosting && <div className="bg-blue-500 w-fit flex gap-2 text-stone-50 py-1 px-2 mt-4 rounded">Posting.. <img className='w-6 h-6' src={loadingIcon} alt="loading-icon" /></div>}
                </Form>
            </Formik>
        </div>
    )
}

export default WriteAnswer