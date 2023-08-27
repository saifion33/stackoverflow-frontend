import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ILoginForm } from '../../Types'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import loadingIcon from '../../assets/loading-icon.svg'
import { login } from '../../redux/actions/auth'
const LoginForm = () => {
    const isLoading = useAppSelector(state => state.auth.loading)
    const dispatch = useAppDispatch()
    const initialValues = {
        email: '',
        password: ''
    }
    const handleSubmit = async (values: ILoginForm) => {
        dispatch(login(values))
    }
    const ValidationSchema = yup.object({
        email: yup.string().email('invalid email').required('email is required'),
        password: yup.string().required('password is required')
    })
    return (
        <div>
            {
                !isLoading && <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
                    <Form className="bg-white shadow rounded-md p-3 drop-shadow" >
                        <div className='my-3'>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='email' className='text-red-600 text-xs' component={'div'} />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                            <ErrorMessage name='password' className='text-red-600 text-xs' component={'div'} />
                        </div>
                        <button type='submit' className='bg-blue-500 py-1 w-full text-lg rounded-md text-stone-50 mt-5'>Login</button>
                    </Form>
                </Formik>
            }
            {
                isLoading && <div className='h-[231px]  w-full flex justify-center items-center shadow'>
                    <img src={loadingIcon} alt="loading icon" />
                </div>
            }
        </div>
    )
}

export default LoginForm