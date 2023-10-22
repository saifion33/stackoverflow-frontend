import { openAskNotificationModal } from '../../redux/slice/notificationSlice'
import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { logOutAuto, logout } from '../../redux/slice/authSlice'
import { checkNetworkAndSession } from '../../utils/helpers'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import loadingIcon from '../../assets/loading-icon.svg'
import { IJwtPayload, ISignupForm } from '../../Types'
import { signup } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import * as yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

const SignupForm = () => {
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const isLoading = useAppSelector(state => state.auth.loading)
    const initialValues = {
        displayName: '',
        email: '',
        password: ''
    }
    const handleAutoLogout = (token: string) => {
        const tokenTime = jwtDecode<IJwtPayload>(token).exp * 1000
        const currentTime = Date.now()
        const timeToexpire = tokenTime - currentTime
        if (timeToexpire > 0) {
            dispatch(logOutAuto(timeToexpire))
        }
        else {
            dispatch(logout())
        }
    }
    const signUpFunction =(values:ISignupForm)=>{
        dispatch(signup(values))
        .then(res=>{
            if (signup.fulfilled.match(res)) {
                const token = res.payload.data.token
                token && handleAutoLogout(token)
                navigate('/')
                signInWithEmailAndPassword(auth,res.meta.arg.email,res.meta.arg.password).catch(err=>console.log(err))
                setTimeout(() => {
                    dispatch(openAskNotificationModal());
                }, 2500);
            }else if (signup.rejected.match(res)) {
                const alertMessage = res.payload?.message
                if (alertMessage) {
                    dispatch(showAlertWithTimeout({message:alertMessage,type:'error'}))
                }
            }
        })

    }
    const handleSubmit = async(values: ISignupForm) => {
        checkNetworkAndSession('network',()=>signUpFunction(values))
    }
    const passRegexp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    const ValidationSchema = yup.object({
        displayName: yup.string().min(3, 'displayName should be minimum 3 characters').required('Display Name is required'),
        email: yup.string().email('invalid email').required('email is required'),
        password: yup.string().matches(passRegexp, 'password invalid').required('password is required')
    })
    return (
        <div>
            {!isLoading && <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={handleSubmit}  >
                <Form className='space-y-2 text-lg bg-white shadow-2xl drop-shadow p-6 rounded mt-5'>
                    <div>
                        <label htmlFor="displayName">Display name</label>
                        <Field type="text" name="displayName" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                        <ErrorMessage name='displayName' className='text-red-600 text-sm' component={'div'} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                        <ErrorMessage name='email' className='text-red-600 text-xs' component={'div'} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                        <ErrorMessage name='password' className='text-red-600 text-xs' component={'div'} />
                        <p className='text-xs text-gray-500 mt-2 font-medium'>
                            Passwords must contain at least eight characters, including at least 1 letter and 1 number.
                        </p>
                    </div>
                    <p className='text-sm py-2 '>
                        <input type="checkbox" name="product-updates" id="product-updates" />
                        Opt-in to recive occasional product updates, user research invitations, company announcements, and digests.
                    </p>
                    <button type='submit' className='bg-blue-500 py-1 w-full text-lg rounded-md text-stone-50'>Sign up</button>
                    <div className='text-xs pt-3'>
                        By clicking "Sign up", you agree to our <span className="text-blue-600">terms of service</span> and acknowledge that you have read and understand our <span className="text-blue-600">privacy policy</span> and <span className="text-blue-600">code of conduct.</span>
                    </div>
                </Form>
            </Formik>}
            {
                isLoading && <div className='h-[60vh]  w-full flex justify-center items-center shadow'>
                    <img src={loadingIcon} alt="loading icon" />
                </div>
            }
        </div>
    )
}

export default SignupForm