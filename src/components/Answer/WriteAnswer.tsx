import { Formik, Form, Field, ErrorMessage } from 'formik'
import {string,object} from 'yup'
import { IpostAnswer } from '../../Types';
import { postAnswerApi } from '../../Api';
import {useState} from 'react'

interface Iprops{
    questionId:string
}

const WriteAnswer = ({questionId}:Iprops) => {
    const [isPosting, setIsPosting] = useState<boolean>(false)
    interface IAns {
        answerBody: string;
    }
    const initialValues:IAns = {
        answerBody: ''
    }

    const validationSchema=object({
        answerBody:string().min(20,'minimum 20 characters is required').required('answer is required'),
    })

    const postAnswerFunction=async(answerData:IpostAnswer)=>{
        setIsPosting(true)
        postAnswerApi(answerData)
        .then(res=>console.log(res.data.data))
        .catch(err=>console.log(err))
        .finally(()=>setIsPosting(false));
    }

    const handleSubmit = async(values: IAns) => {
       const answerData = {...values, questionId}
       postAnswerFunction(answerData)
    }

    return (
        <div className="px-3">
            <h1 className="text-2xl py-3">Your Answer</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                <Form>
                    <Field name="answerBody" component={'textarea'} rows={5}  className="w-full p-3 border-[1px] outline-none focus:outline focus:outline-4 focus:outline-blue-100 rounded"/>
                    <ErrorMessage name='answerBody' className='text-red-600' component={'div'}/> 
                    <button type="submit" className="bg-blue-500 text-stone-50 py-1 px-2 mt-4 rounded">{!isPosting ?"Post Your Answer":"posting..." }</button>
                </Form>
            </Formik>
        </div>
    )
}

export default WriteAnswer