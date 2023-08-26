import { ErrorMessage, Field, Formik, Form } from "formik"
import { string, object, } from 'yup'

const ResetPassword = () => {
    const initialValues = {
        password: ''
    }

    const validationSchema = object({
        password: string().required('password is required.')
    })

    interface IFormValues {
        password: string
    }
    const handleSubmit = (values: IFormValues) => {
        console.log(values)
    }
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="p-6 rounded-md bg-white drop-shadow max-w-[316px] w-full">
                <p className="text-sm">Enter your new password blow.</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            <div className='my-3 space-y-2'>
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                                <p className="h-5">{formik.values.password}</p>
                                <ErrorMessage name='password' className='text-red-600 text-xs' component={'div'} />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-stone-50 py-1 px-3 rounded-md">Reset Password</button>
                        </Form>)
                    }
                </Formik>
                {/* <div>
                    Account recovery password sent to <email>
                    If you don't see this password in your inbox within 15 minutes, look for it in your spam mail folder. If you find it there, please mark it as “Not Spam”.
                </div> */}
            </div>
        </div>
    )
}

export default ResetPassword