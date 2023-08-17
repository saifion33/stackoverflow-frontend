import { Formik, Form, Field, ErrorMessage } from 'formik'
import { IAskQuestion } from '../Types'
import * as yup from 'yup'

const AskQuestion = () => {
    const initialValues = {
        title: '',
        description: '',
        tags: ''
    }

    const validationSchema = yup.object({
        title: yup.string().min(5, 'minimum 5 character is required').max(100, 'maximum 100 character is allowed').required('Title is required'),
        description: yup.string().min(20, 'minimum 20 character is required').max(6000, 'maximum 6000 character is allowed').required('Description is required'),
        tags: yup.string().required('Tags is required')
    })

    const handleSubmit = (values: IAskQuestion) => {
        console.log(values)
    }

    return (
        <div className=' flex justify-center' >
            <div className=' w-full max-w-7xl p-3'>
                <div >
                    <h1 className='text-2xl my-2'>Ask a Public question</h1>
                </div>
                <div className='border-[1px] border-blue-500 bg-blue-50 rounded-md p-4 space-y-2 max-w-3xl'>
                    <h2 className='text-2xl my-2'>Writing a good question</h2>
                    <div className='text-sm'>
                        <p>You're ready to <span className="text-blue-500">ask</span> a <span className="text-blue-500">programming-related question</span> and this form will help guide you through the process.</p>
                        <p>Looking to ask a non-programming question? See <span className="text-blue-500">the topics here</span> to find a relevent site.</p>
                    </div>
                    <p>Steps</p>
                    <ul className='list-disc p-2 text-gray-700 text-sm'>
                        <li>Summarize your problem in a one-line title</li>
                        <li>Describe your problem in more detail</li>
                        <li>Add "tags" which help surface your question to members of the community.</li>
                        <li>Review your question and post it to the site.</li>
                    </ul>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}  >
                    <Form>
                        <div className='my-3 border-[1px] rounded-md p-3 space-y-2'>
                            <label htmlFor="title">Title</label>
                            <p className='text-gray-500 text-sm'>Be specific and imagine you're asking a question to another person.</p>
                            <Field type="text" name="title" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='title' className='text-red-600 text-xs' component={'div'} />
                        </div>
                        <div className='my-3 border-[1px] rounded-md p-3 space-y-2'>
                            <label htmlFor="description">Description</label>
                            <p className='text-gray-500 text-sm' >Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                            <Field type="text" name="description" component={'textarea'} className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='description' className='text-red-600 text-xs' component={'div'} />
                        </div>
                        <div className='my-3 border-[1px] rounded-md p-3 space-y-2'>
                            <label htmlFor="tags">Tags</label>
                            <p className='text-gray-500 text-sm' >Add up to 5 comma seprated tags to describe what your question is about.</p>
                            <Field type="text" name="tags" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='tags' className='text-red-600 text-xs' component={'div'} />
                        </div>
                        <div className='flex justify-end py-4'>
                            <button type='submit' className='bg-blue-600 text-stone-50 py-1 px-4 rounded-md text-lg'  >Review your question</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AskQuestion