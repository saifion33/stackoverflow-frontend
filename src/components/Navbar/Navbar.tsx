import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import StackoverflowIcon from '../../assets/stackoverflow-icon.svg'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import StackoverflowLogo from '../../assets/stackoverflow.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice'
import NavContentBox from './NavContentBox'
import { useRef, useState } from 'react'
import Avatar from '../users/Avatar'

const Navbar = () => {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isSearchBoxHidden, setIsSearchBoxHidden] = useState<boolean>(true)
    const searchRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)
    const dispatch=useAppDispatch()
    const handleSearchBoxOpen = () => setIsSearchBoxHidden(p => !p)

    const showMenuIconPages=['/','/users/account-recovery','/users/login','/users/signup','/voip']
    return (
        <nav className='flex sticky top-0 left-0 z-50  justify-center bg-white shadow w-full '>
            <div className='flex relative items-center   gap-1 py-1 px-2 w-full max-w-7xl'>
                <div role='button' className={`text-2xl text-gray-700 sm:mr-2  ${((showMenuIconPages.includes(location.pathname)) || window.innerWidth <= 640) ? 'block' : 'hidden'}`} onClick={() => setIsMenuOpen(p => !p)} >
                    {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </div>
                <div className='' >
                    <img src={StackoverflowLogo} className='hidden sm:block min-w-[120px] max-w-[120px]' alt="stackoverflow logo" />
                    <img src={StackoverflowIcon} className='sm:hidden  max-w-[60px]' alt="stackoverflow icon" />
                </div>
                <div className='md:flex md:gap-2 text-sm'>
                    <button className='rounded-full py-[3px] px-3 hover:bg-gray-200 hidden  md:block'>About</button>
                    <button className='rounded-full py-[3px] px-3 mr-auto hover:bg-gray-200 text-sm '>Products</button>
                    <button className='rounded-full py-[3px] px-3 hover:bg-gray-200 hidden md:block whitespace-nowrap'>For Teams</button>
                </div>
                <div className=' w-full'>
                    <AiOutlineSearch role="button" onClick={handleSearchBoxOpen} className="text-2xl ml-auto sm:hidden" />
                    <div className={`absolute sm:static top-12 ${isSearchBoxHidden ? 'hidden' : 'block'} sm:block sm:ml-auto left-0 bg-gray-100 sm:bg-transparent w-full max-w-sm lg:max-w-2xl p-2`}>
                        <div className='flex  w-full gap-3 border-[1px] group focus-within:border-blue-600 focus-within:outline-4 focus-within:outline outline-blue-100 border-gray-400 rounded bg-white items-center p-1' >
                            <AiOutlineSearch className="text-xl text-gray-500" />
                            <input ref={searchRef} className='w-full outline-none group-focus:outline-2' placeholder='Search...' type="text" />
                        </div>

                    </div>
                </div>
                {
                    !user && <div className='flex gap-2 '>
                        <button onClick={() => navigate('/users/login')} className='py-1 px-2 rounded bg-blue-100 text-blue-700 whitespace-nowrap'>Log in</button>
                        <button onClick={() => navigate('/users/signup')} className='py-1 px-2 rounded bg-blue-500 text-stone-50 whitespace-nowrap'>Sign up</button>
                    </div>
                }
                {
                    user && user.profile && <div className='flex gap-2 items-center'>
                        <Avatar user={user.profile} />
                        <button onClick={()=>{dispatch(logout());navigate('/')}} className='px-3 py-[2px] border-2 border-blue-600 bg-blue-50 rounded '>Logout</button>
                    </div>
                }
                {
                    isMenuOpen && <NavContentBox onLinkClick={() => setIsMenuOpen(false)} isOpenFromPage={false} />
                }
            </div>
        </nav>
    )
}

export default Navbar