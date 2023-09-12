import axios from "axios"
import { ErrorMessage, Field, Formik, Form } from "formik"
import { useState } from 'react'
import { string, object, } from 'yup'
import { IipInfo } from "../Types"
import { forgetPasswordApi } from "../Api"
import { useAppDispatch } from "../redux-hooks"
import { showAlertWithTimeout } from "../redux/slice/alertSlice"
import { FaCheckCircle } from "react-icons/fa"
import Loading from "../components/Loading"
import { checkNetworkAndSession } from "../utils/helpers"

const ForgotPassword = () => {
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false)
    const [isEmailSentSuccessfully, setIsEmailSentSuccessfully] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const initialValues = {
        email: ''
    }

    const validationSchema = object({
        email: string().email('Please Enter Valid email').required('Email is required.')
    })

    interface IFormValues {
        email: string
    }
    const getIpInfo = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_IP_API)
            const data = response.data as IipInfo
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }
    const forgetPasswordFunction = async(values:IFormValues) =>{
        const ipInfo = await getIpInfo();
        const deviceInfo = {
            ip: ipInfo?.ip || 'Unknown',
            location: `${ipInfo?.city} ${ipInfo?.country}`
        }
        setIsSendingEmail(true)
        forgetPasswordApi({ deviceInfo, email: values.email })
            .then(()=>setIsEmailSentSuccessfully(true))
            .catch(err => {
                console.log(err);
                const errorMessage = err as { response: { data: { status: number, message: string } } }
                dispatch(showAlertWithTimeout({ message: errorMessage.response.data.message || 'Something went wrong.', type: 'error' }))
            })
            .finally(() => setIsSendingEmail(false))
    }
    
    const handleSubmit = async (values: IFormValues) => {
        checkNetworkAndSession('network',()=>forgetPasswordFunction(values))
    }
    return (
        <div className="flex justify-center items-center h-[80vh]">
            {( !isEmailSentSuccessfully && !isSendingEmail) && <div className="p-6 rounded-md bg-white drop-shadow max-w-[316px] w-full">
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

            </div>}

            {(!isSendingEmail && isEmailSentSuccessfully) && <div className="bg-green-50 border-2 border-green-600 max-w-xs p-3 rounded-md">
                <div className="text-center pb-4">
                    <FaCheckCircle className="text-3xl text-green-600 mx-auto" />
                    <p className="text-lg text-slate-900">Email sent successfully.</p>
                </div>
                <p className="text-center text-slate-900">Account recovery email sent to your email. This will expire within 5 minutes.
                Look for it in your spam mail folder. If you find it there, please mark it as “Not Spam”.</p>
            </div>}
            {
                isSendingEmail && <div>
                    <Loading/>
                </div>
            }
        </div>
    )
}

export default ForgotPassword