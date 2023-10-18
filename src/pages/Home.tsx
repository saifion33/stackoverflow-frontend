import searchIcon from '../assets/search-illustration.svg'
import lockIcon from '../assets/lock-illustration.svg'
import { useAppSelector } from '../redux-hooks'
import AllQuestions from '../components/Questions/AllQuestions'
import PageContainer from '../components/PageContainer'
const Home = () => {
  const user = useAppSelector(state => state.auth.user?.profile)
  return (
    <div>
      {
        !user && <div className="p-4 lg:p-8 z-0">
          <div className="black-container bg-[#303439] rounded-md p-6 lg:p-12">
            <div className='flex justify-center flex-wrap gap-9'>
              <div className='bg-[#FEE3CD] relative rounded-md p-3 flex flex-col gap-3 items-center max-w-md lg:p-8 '>
                <div className="image-container">
                  <img src={searchIcon} alt="search icon" />
                </div>
                <p className='text-xl text-center '>Find the best answer to your technical question, help others answer theirs</p>
                <button className='bg-customOrange text-stone-50 py-2 px-3 rounded text-lg'>Join the community</button>
                <p className='text-sm text-slate-600'>or <span className='text-slate-700 underline hover:text-customOrange cursor-pointer'>search content</span></p>
                <div className='absolute -bottom-7 w-8 h-8   border-t-[35px] border-t-[#FEE3CD] rounded-br-xl border-l-[35px] border-l-transparent  right-0  '></div>
              </div>
              <div className='bg-[#CDE9FE] relative rounded-md p-3 flex flex-col gap-3 items-center max-w-md lg:p-8 '>
                <div className="image-container">
                  <img src={lockIcon} alt="lock icon" />
                </div>
                <p className='text-xl text-center '>Want a secure, private space for your technical knowledge?</p>
                <button className='bg-blue-500 text-stone-50 py-2 px-3 rounded text-lg'>Discover Teams</button>
                <div className='absolute left-0 -bottom-7 w-8 h-8   border-t-[35px] border-t-[#CDE9FE] rounded-bl-xl border-r-[35px] border-r-transparent    '></div>
              </div>
            </div>
            <div className='py-14 lg:py-20 w-full flex justify-center'>
              <h1 className='text-stone-50 font-bold text-center text-3xl lg:text-5xl max-w-2xl'>Every <span className='text-customOrange'>Developer</span> has a tab open to Stack Overflow</h1>
            </div>
            <div className='w-16 h-3 bg-gray-600 rounded-full mx-auto'></div>
            <div className='py-8 flex justify-center flex-wrap gap-5 text-stone-100 text-center'>
              <div className='max-w-[231px]'>
                <h2 className='text-2xl font-bold'>100+ million</h2>
                <p className='text-gray-400'>monthly visitors to Stack Overflow & Stack Exchange</p>
              </div>
              <div className='max-w-[231px]'>
                <h2 className='text-2xl font-bold'>45.1+ billion</h2>
                <p className='text-gray-400'>Times a developer got help since 2008</p>
              </div>
              <div className='max-w-[231px]'>
                <h2 className='text-2xl font-bold'>191% ROI</h2>
                <p className='text-gray-400'>from companies using Stack Overflow for Teams</p>
              </div>
              <div className='max-w-[231px]'>
                <h2 className='text-2xl font-bold'>5,000+</h2>
                <p className='text-gray-400'>Stack Overflow for Teams instances active every day</p>
              </div>

            </div>
          </div>
        </div>
      }
      {
        user && <PageContainer>
          <AllQuestions/>
        </PageContainer>
      }
    </div>
  )
}

export default Home