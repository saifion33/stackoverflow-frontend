import { showAlertWithTimeout } from "../../redux/slice/alertSlice"
import { useAppDispatch, useAppSelector } from "../../redux-hooks"
import UpdateProfileImage, { RefType } from "./UpdateProfileImage"
import { checkNetworkAndSession } from "../../utils/helpers"
import { updateUserProfile } from "../../redux/actions/auth"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { FaUserSlash } from "react-icons/fa6"
import { useParams } from "react-router-dom"
import { IUserUpdates } from "../../Types"
import { object, string } from 'yup'
import { useRef } from 'react'
import Loading from "../Loading"

interface IUserForm {
    displayName: string,
    about: string,
    location: string,
    tags: string,
}





const validationSchema = object({
    displayName: string().min(3, 'Minimum 3 character is required').required('Display name is required.')
})


const EditUserProfile = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const childComponentRef = useRef<RefType>()
    const user = useAppSelector(state => state.auth.user?.profile)
    const loading = useAppSelector(state => state.auth.loading)

    const handleUpdate = async (updates: IUserUpdates) => {
        const res = await dispatch(updateUserProfile(updates))
        if (updateUserProfile.fulfilled.match(res)) {
            dispatch(showAlertWithTimeout({ message: "User profile updated successfully", type: 'success' }))
        }
        else if (updateUserProfile.rejected.match(res)) {
            dispatch(showAlertWithTimeout({ message: res.payload?.message || 'Something went wrong', type: 'error' }))
        }
    }

    const handleSubmit = async (values: IUserForm) => {
        const image = await childComponentRef.current?.uploadImage()
        const updates: IUserUpdates = {
            displayName: (values.displayName.trim() !== user?.displayName) ? values.displayName : undefined,
            about: (values.about.trim() !== user?.about) ? values.about : undefined,
            location: (values.location.trim() !== user?.location) ? values.location : undefined,
            tags: (values.tags.trim() !== user?.tags) ? values.tags : undefined,
            image: image ? image : undefined
        }
        checkNetworkAndSession('both', () => handleUpdate(updates))
    }
    return (
        <div>
            <h1 className="text-3xl my-4">Edit Your Profile</h1>
            {
                (user && user._id === id && !loading) && <div className="border-[1px] rounded p-4">
                    <UpdateProfileImage userId={user._id} imageUrl={user.imageUrl} ref={childComponentRef} />
                    <Formik initialValues={{
                        displayName: user?.displayName || '',
                        about: user?.about || '',
                        location: user?.location || '',
                        tags: user?.tags || '',
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
                (!user && !loading) && <div className="py-5 text-center h-96 flex flex-col justify-center items-center gap-3">
                    <FaUserSlash className="text-7xl text-gray-700 " />
                    <div>
                        <p className="text-xl text-gray-800">User Profile not found.</p>
                        <p className=" text-gray-500">Make Sure You are Logged In</p>
                    </div>
                </div>
            }
            {
                (user && id !== user?._id && !loading) && <div className="py-5 text-center text-lg">

                    <p>You don't have permission to Edit this user profile</p>
                    <p className="text-gray-500">Please Login with this user to edit profile</p>
                </div>
            }
            {
                loading && <Loading/>
            }
        </div>
    )
}

export default EditUserProfile