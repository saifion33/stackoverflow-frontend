import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import reputationIcon from '../assets/reputation-badge.svg'
import SignupForm from '../components/Signup/SignupForm'
import askQuestionIcon from '../assets/ask-Question.svg'
import SaveIcon from '../assets/bookmark.svg'
import voteIcon from '../assets/voting.svg'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'


const Signup = () => {
  return (
    <div className='flex justify-center min-w-full'>
      <div className="py-3 max-w=[271px]  md2:px-6 md2:flex items-center justify-center ">
        <div className="details-container py-3 px-6">
          <p className="text-xl text-center md2:hidden">
            Create Stack Overflow account. It's free and only takes a minute.
          </p>
          <div className='hidden md2:block space-y-5 py-3 px-6'>
            <h1 className='text-3xl'>Join the Stack Overflow community</h1>
            <ul className='space-y-6 pr-12'>
              <li className="flex item-center gap-2">
                <img src={askQuestionIcon} alt="ask question" />
                <p>Get unstuck — ask a question</p>
              </li>
              <li className="flex item-center gap-2">
                <img src={voteIcon} alt="vote" />
                <p>Unlock new privileges like voting and commenting</p>
              </li>
              <li className="flex item-center gap-2">
                <img src={SaveIcon} alt="save" />
                <p>Save your favorite questions, answers, watch tags, and more</p>
              </li>
              <li className="flex item-center gap-2">
                <img src={reputationIcon} alt="reputation" />
                <p>Earn reputation and badges</p>
              </li>
            </ul>
            <div className='text-xs'>
              <p>Collaborate and share knowledge with a private group for FREE.</p>
              <p className='text-blue-500'>Get Stack Overflow for Teams free for up to 50 users.</p>
            </div>
          </div>
        </div>
        <div className="form-container  ">
          <div className='max-w-[316px] mx-auto p-2'>
            <div className=' space-y-2'>
              <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md border-[1px]'><FcGoogle /> Sign up with Google</button>
              <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md bg-[#2d2d2d] text-stone-50 '><AiFillGithub /> Sign up with GitHub</button>
              <button className='flex items-center justify-center gap-2 py-2 w-full rounded-md bg-blue-600 text-stone-50  '><AiFillFacebook /> Sign up with Facebook</button>
            </div>
            <SignupForm />
          </div>
          <div className='flex flex-col items-center py-6 gap-2'>
            <p>Already have an account? <Link to={'/users/login'} role='link' className='text-blue-500 cursor-pointer'>Log in</Link></p>
            <p>Are you an employer? <span role='link' className='text-blue-500 cursor-pointer'>Sign up on Talent</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup