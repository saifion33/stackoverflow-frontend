import { ErrorMessage, Field, Form, Formik } from "formik"
import { usersList } from "../../utils/helpers"
import { object, string } from 'yup'
import UpdateProfileImage from "./UpdateProfileImage"

interface IUserForm {
    displayName: string,
    about: string,
    location: string,
    tags: string,
}

const EditUserProfile = () => {
    const user = usersList[1]

    const initialValues = {
        displayName: user.displayName,
        about: user.about,
        location: user.location,
        tags: user.tags,
    }

    const validationSchema = object({
        displayName: string().min(3, 'Minimum 3 character is required').required('Display name is required.')
    })
    const handleSubmit = (values:IUserForm) => {
        console.log(values)
    }
    return (
        <div>
            <h1 className="text-3xl my-4">Edit Your Profile</h1>
            <div className="border-[1px] rounded p-4">
                <UpdateProfileImage imageUrl={user.imageUrl} />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
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
        </div>
    )
}

export default EditUserProfile