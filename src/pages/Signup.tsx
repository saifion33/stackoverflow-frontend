import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import SignupForm from '../components/Signup/SignupForm'
const Signup = () => {
  return (
    <div className="py-3">
      <div className="details-container py-3 px-6">
        <p className="text-xl text-center">
          Create Stack Overflow account. It's free and only takes a minute.
        </p>
      </div>
      <div className="form-container  ">
        <div className='max-w-[316px] mx-auto p-2'>
          <div className='text-lg space-y-2'>
            <button className='flex items-center justify-center gap-2 py-1 w-full rounded-md border-[1px]'><FcGoogle /> Sign up with Google</button>
            <button className='flex items-center justify-center gap-2 py-1 w-full rounded-md bg-[#2d2d2d] text-stone-50 '><AiFillGithub /> Sign up with GitHub</button>
            <button className='flex items-center justify-center gap-2 py-1 w-full rounded-md bg-blue-600 text-stone-50  '><AiFillFacebook /> Sign up with Facebook</button>
          </div>
          <SignupForm/>
        </div>
        <div className='flex flex-col items-center py-6 gap-2'>
          <p>Already have an account? <span className='text-blue-500'>Log in</span></p>
          <p>Are you an employer?<span className='text-blue-500'>Sign up on Talent</span></p>
        </div>
      </div>
    </div>
  )
}

export default Signup