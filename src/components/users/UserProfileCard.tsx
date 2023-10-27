import userIcon from '../../assets/user-icon.svg'
import { IBasicUserDetails, IReciver, IUserPresence } from "../../Types"
import { useNavigate } from "react-router-dom"
import { usePresence } from '../../utils/customHooks'
import { IoCall, IoVideocam } from 'react-icons/io5'
import { useAppSelector } from '../../redux-hooks'

interface IProps {
    user: IBasicUserDetails,
    makeAudioCall?: (reciver:IReciver) => void,
    makeVideoCall?: (reciver:IReciver) => void,
}

const UserProfileCard = ({ user, makeAudioCall, makeVideoCall }: IProps) => {

    const navigate = useNavigate()
    const isOnline: IUserPresence = usePresence(user.fuid)
    const loggedInUser = useAppSelector(state => state.auth.user?.profile)
    const admin = loggedInUser?._id === user._id || false;

    return (
        <div className="flex gap-2 items-start  shadow p-2 rounded">

            <div className="w-16 h-16 rounded overflow-hidden">
                {user.imageUrl && <img className="max-w-full" src={user.imageUrl} alt={user.displayName} />}
                {!user.imageUrl && <img className="max-w-full " src={userIcon} alt={user.displayName} />}
            </div>
            <div className="text-xs">
                <h3 onClick={() => navigate(`./${user._id}`)} role="button" className="text-blue-600 text-sm">{user.displayName}</h3>
                <p className="">{user.location}</p>
                <p className="text-gray-500 font-medium">{user.reputation}</p>
                <p className="text-blue-600">{user.tags}</p>
            </div>
            {(isOnline.isOnline && !admin) && <div className='space-y-3'>
                {
                    makeAudioCall && <div onClick={() =>makeAudioCall({fuid:user.fuid,name:user.displayName})} className={` p-1  rounded-full bg-green-500 cursor-pointer`}><IoCall /></div>
                }
                {
                    makeVideoCall && <div onClick={() =>makeVideoCall({fuid:user.fuid,name:user.displayName})} className={` p-1  rounded-full bg-green-500 cursor-pointer`}><IoVideocam /></div>
                }
            </div>}
        </div>
    )
}

export default UserProfileCard
