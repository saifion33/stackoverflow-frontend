import { ErrorMessage, Field, Form, Formik } from "formik"
import { object, string } from 'yup'
import UpdateProfileImage from "./UpdateProfileImage"
import { useAppSelector } from "../../redux-hooks"
import { useParams } from "react-router-dom"

interface IUserForm {
    displayName: string,
    about: string,
    location: string,
    tags: string,
}

const EditUserProfile = () => {
    const user = useAppSelector(state => state.auth.user?.profile)
    const {id} =useParams()
    const validationSchema = object({
        displayName: string().min(3, 'Minimum 3 character is required').required('Display name is required.')
    })
    const handleSubmit = (values: IUserForm) => {
        console.log(values)
    }
    return (
        <div>
            <h1 className="text-3xl my-4">Edit Your Profile</h1>
            {
                (user && user._id===id) && <div className="border-[1px] rounded p-4">
                    <UpdateProfileImage imageUrl={user.imageUrl} />
                    <Formik initialValues={{
                        displayName: user?.displayName ||'',
                        about: user?.about ||'',
                        location: user?.location ||'',
                        tags: user?.tags ||'',
                    }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit} >
                        <Form>
                            <div className='my-3 space-y-2'>
                                <label htmlFor="displayName">Display Name</label>
                                <Field name="displayName" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                                <ErrorMessage name='displayName' className='text-red-600 text-xs' component={'div'} />
                            </div>
                            <div className='my-3  space-y-2'>
                                <label htmlFor="location">Location</label>
                                <Field name="location" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                                <ErrorMessage name='location' className='text-red-600 text-xs' component={'div'} />
                            </div>
                            <div className='my-3  space-y-2'>
                                <label htmlFor="about">About</label>
                                <Field name="about" component="textarea" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                                <ErrorMessage name='about' className='text-red-600 text-xs' component={'div'} />
                            </div>
                            <div className='my-3 space-y-2'>
                                <label htmlFor="tags">Tags</label>
                                <p className="text-sm">Add comma seperated tags</p>
                                <Field name="tags" className="border-[1px] rounded p-1 w-full focus:outline-4 focus:outline outline-blue-100 " />
                                <ErrorMessage name='tags' className='text-red-600 text-xs' component={'div'} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="reset" className="px-3 py-1 rounded border-[1px] hover:bg-gray-50" >Cancel</button>
                                <button type="submit" className="px-3 py-1 rounded text-white bg-customOrange hover:bg-orange-500">Update</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            }
            {
                !user && <div className="py-5 text-center text-lg">
                    User Profile Not found
                </div>
            }
            {
                id!==user?._id && <div className="py-5 text-center text-lg">
                   <p>You don't have permission to Edit this user profile</p>
                   <p className="text-gray-500">Please Login with this user to edit profile</p>
                </div>
            }
        </div>
    )
}

export default EditUserProfile