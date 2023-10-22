import userIcon from '../../assets/user-icon.svg'
import { IBasicUserDetails, IUserPresence } from "../../Types"
import { useNavigate } from "react-router-dom"
import { usePresence } from '../../utils/customHooks'
interface IProps {
    user: IBasicUserDetails
}
const UserProfileCard = ({ user }: IProps) => {
    const navigate = useNavigate()
    const isOnline:IUserPresence=usePresence(user.fuid)
    return (
        <div className="flex gap-2 items-start relative shadow py-2 p-4 rounded">
            <div className={`absolute top-2 right-2 w-3  h-3 rounded-full  ${isOnline.isOnline?'bg-green-600':''}`}></div>
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
        </div>
    )
}

export default UserProfileCard
