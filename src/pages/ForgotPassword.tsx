import { ErrorMessage, Field, Formik, Form } from "formik"

import { string, object, } from 'yup'

const ForgotPassword = () => {
    const initialValues = {
        email: ''
    }

    const validationSchema = object({
        email: string().email('Please Enter Valid email').required('Email is required.')
    })

    interface IFormValues {
        email: string
    }
    const handleSubmit = (values: IFormValues) => {
        console.log(values)
    }
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="p-6 rounded-md bg-white drop-shadow max-w-[316px] w-full">
                <p className="text-sm">Forgot your account's password? Enter your email address and we'll send you a recovery link.</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    <Form>
                        <div className='my-3 space-y-2'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='email' className='text-red-600 text-xs' component={'div'} />
                        </div>
                            <button className="w-full bg-blue-600 text-stone-50 py-1 px-3 rounded-md">Send Recovery Email</button>
                    </Form>
                </Formik>
                {/* <div>
                    Account recovery email sent to saifiazeem33@gmail.com
                    If you don't see this email in your inbox within 15 minutes, look for it in your spam mail folder. If you find it there, please mark it as “Not Spam”.
                </div> */}
            </div>
        </div>
    )
}

export default ForgotPassword