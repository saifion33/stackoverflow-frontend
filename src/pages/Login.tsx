import stackoverflowIcon from '../assets/stackoverflow-icon.svg'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import LoginForm from '../components/Login/LoginForm'
import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <div className='flex flex-col items-center '>
            <div className=' w-full max-w-[277px] space-y-5' >
                <img src={stackoverflowIcon} className='w-20 mx-auto mt-3' alt="stackoverflow" />
                <div className=' space-y-2 w-full'>
                    <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md border-[1px]'><FcGoogle /> Log in with Google</button>
                    <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md bg-[#2d2d2d] text-stone-50 '><AiFillGithub /> Log in with GitHub</button>
                    <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md bg-blue-900 text-stone-50  '><AiFillFacebook /> Log in with Facebook</button>
                </div>
                <div className='mt-5'>
                    <LoginForm />
                </div>
                <div className='flex flex-col items-center py-6 gap-2 text-gray-600 text-sm'>
                    <p>Don't have an account? <Link to={'/users/signup'} role='link' className='text-blue-500 cursor-pointer'>Sign up</Link></p>
                    <p>Are you an employer?<span role='link' className='text-blue-500 cursor-pointer'>Sign up on Talent</span></p>
                </div>
            </div>
        </div>
    )
}

export default Login