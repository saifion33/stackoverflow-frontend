import { Formik, Form, Field, ErrorMessage } from 'formik'
import {string,object} from 'yup'

const WriteAnswer = () => {
    interface IAns {
        answer: string;
    }
    const initialValues = {
        answer: ''
    }

    const validationSchema=object({
        answer:string().min(20,'minimum 20 characters is required').required('answer is required'),
    })

    const handleSubmit = (values: IAns) => {
        console.log(values)
    }

    return (
        <div className="px-3">
            <h1 className="text-2xl py-3">Your Answer</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                <Form>
                    <Field name="answer" component={'textarea'} rows={5}  className="w-full p-3 border-[1px] outline-none focus:outline focus:outline-4 focus:outline-blue-100 rounded"/>
                    <ErrorMessage name='answer' className='text-red-600' component={'div'}/>
                    
                    <button type="submit" className="bg-blue-500 text-stone-50 py-1 px-2 mt-4 rounded">Post Your Answer</button>
                </Form>
            </Formik>
        </div>
    )
}

export default WriteAnswer