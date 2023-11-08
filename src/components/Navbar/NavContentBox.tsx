import promoImage from '../../assets/stackoverflow-sidebar-promo.svg'
import starIcon from '../../assets/star-collective.svg'
import { BiSolidInfoCircle } from 'react-icons/bi'
import { GiEarthAmerica } from 'react-icons/gi'
import CustomNavLink from './CustomNavlink'

interface IProps{
    isOpenFromPage: boolean
    onLinkClick?():void,
   
}
const NavContentBox = ({isOpenFromPage,onLinkClick}:IProps) => {
    return (
        <div className={` ${isOpenFromPage?'static shadow-none w-[170px] ':'absolute shadow w-[200px]'}  flex flex-col top-[50px] md:top-[60px] left-0  py-3 h-[85vh]  bg-white text-gray-500  gap-3`}>
            <CustomNavLink onOptionClick={onLinkClick} to='/' extraActiveStyle='pl-2' extraIdleStyle='pl-2' >Home</CustomNavLink>
            <div className='pl-2 w-full flex flex-col '>
                <p className='text-gray-500  '>PUBLIC</p>
                <CustomNavLink onOptionClick={onLinkClick} extraIdleStyle='pl-0' extraActiveStyle='pl-0' to='/questions' ><div className='flex items-center gap-2'><GiEarthAmerica />Questions</div>  </CustomNavLink>
                <div className='flex flex-col gap-2 items-start'>
                    <CustomNavLink onOptionClick={onLinkClick} to="/tags">Tags</CustomNavLink>
                    <CustomNavLink onOptionClick={onLinkClick} to='/users'>Users</CustomNavLink>
                    <CustomNavLink onOptionClick={onLinkClick} to="/companies">Companies</CustomNavLink>
                    {/* <CustomNavLink onOptionClick={onLinkClick} to="/video">videos</CustomNavLink>
                    <CustomNavLink onOptionClick={onLinkClick} to="/voip">VOIP</CustomNavLink> */}
                </div>
            </div>
            <div className=' flex flex-col gap-2'>
                <div className='flex justify-between px-2 items-center text-xs font-semibold'>
                    COLLECTIVES <BiSolidInfoCircle className="text-lg" />
                </div>
                <CustomNavLink onOptionClick={onLinkClick} to='/collectives' extraActiveStyle='pl-0' extraIdleStyle='pl-0' >
                    <div className='flex gap-2'>
                        <img src={starIcon} alt="star icon" />
                        <p>Explore Collectives</p>
                    </div>
                </CustomNavLink>
                <div className='px-2 text-xs font-semibold'>
                    TEAMS
                </div>
                <div className='text-xs flex flex-col items-center'>
                    <p className='px-6 text-center'>
                        <b className='text-gray-800'> Stack Overflow for Teams -</b>
                        Start collaborating and sharing organizational knowledge.
                    </p>
                    <img src={promoImage} alt="promo image" />
                    <button className='bg-customOrange py-1 px-8 text-sm rounded-md text-stone-50'>Create a free Team</button>
                    <p>Why Teams?</p>
                </div>
            </div>
        </div>
    )
}

export default NavContentBox