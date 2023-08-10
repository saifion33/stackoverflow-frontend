
import { GiEarthAmerica } from 'react-icons/gi'
import { BiSolidInfoCircle } from 'react-icons/bi'
import starIcon from '../../assets/star-collective.svg'
import promoImage from '../../assets/stackoverflow-sidebar-promo.svg'
import CustomNavLink from './CustomNavlink'
const NavContentBox = () => {
    return (
        <div className={` absolute flex flex-col top-[50px] md:top-[60px] left-0 w-56 py-3 h-[85vh]  bg-white text-gray-500 shadow gap-3`}>
            <CustomNavLink to='/' extraActiveStyle='pl-2' extraIdleStyle='pl-2' >Home</CustomNavLink>
            <div className='pl-2 w-full flex flex-col '>
                <p className='text-gray-500  '>PUBLIC</p>
                <CustomNavLink extraIdleStyle='pl-0' extraActiveStyle='pl-0' to='/questions' ><div className='flex items-center gap-2'><GiEarthAmerica />Questions</div>  </CustomNavLink>
                <div className='flex flex-col gap-2 items-start'>
                    <CustomNavLink to="/tags">Tags</CustomNavLink>
                    <CustomNavLink to='/users'>Users</CustomNavLink>
                    <CustomNavLink to="/companies">Companies</CustomNavLink>
                </div>
            </div>
            <div className=' flex flex-col gap-2'>
                <div className='flex justify-between px-2 items-center text-xs font-semibold'>
                    COLLECTIVES <BiSolidInfoCircle className="text-lg" />
                </div>
                <CustomNavLink to='/collectives' extraActiveStyle='pl-0' extraIdleStyle='pl-0' >
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