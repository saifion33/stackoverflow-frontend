import { ErrorMessage, Field, Formik, Form } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { string, object, } from 'yup'
import { useState } from 'react'
import { resetPasswordApi } from "../Api"
import { IResetPassword } from "../Types"
import { useAppDispatch } from "../redux-hooks"
import { showAlertWithTimeout } from "../redux/slice/alertSlice"
import { checkNetworkAndSession } from "../utils/helpers"
import Loading from "../components/Loading"

const ResetPassword = () => {
    const { token } = useParams()
    const navigete = useNavigate()
    const [isReseting, setIsReseting] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const initialValues = {
        password: ''
    }

    const validationSchema = object({
        password: string().required('password is required.')
    })

    interface IFormValues {
        password: string
    }
    const resetPasswordFunction = async (data: IResetPassword) => {
        resetPasswordApi(data)
            .then(() => {
                setIsReseting(true)
                dispatch(showAlertWithTimeout({ message: "Password reset successfully.", type: "success" }));
                navigete('/users/login')
            })
            .catch((error) => {
                const errorMessage = error as { response: { data: { status: number, message: string } } };
                dispatch(showAlertWithTimeout({ message: errorMessage.response.data.message || 'Something went wrong.', type: 'error' }))
            })
            .finally(() => {
                setIsReseting(false);
            })
    }
    const handleSubmit = (values: IFormValues) => {
        if (token) {
            checkNetworkAndSession('network', () => resetPasswordFunction({ newPassword: values.password, token }))
        }
    }
    return (
        <div className="flex justify-center items-center h-[80vh]">
            {
                !isReseting && <div className="p-6 rounded-md bg-white drop-shadow max-w-[316px] w-full">
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
                </div>
            }
            {
                isReseting && <Loading/>
            }
        </div>
    )
}

export default ResetPassword