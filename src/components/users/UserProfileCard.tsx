import userIcon from '../../assets/user-icon.svg'
import { IBasicUserDetails } from "../../Types"
import { useNavigate } from "react-router-dom"
interface IProps {
    user: IBasicUserDetails
}
const UserProfileCard = ({ user }: IProps) => {
    const navigate=useNavigate()
    return (
        <div className="flex gap-2 items-start">
            <div className="w-16 h-16 rounded overflow-hidden">
                {user.imageUrl && <img className="max-w-full" src={user.imageUrl} alt={user.displayName} />}
                {!user.imageUrl && <img className="max-w-full " src={userIcon} alt={user.displayName} />}
            </div>
            <div className="text-xs">
                <h3 onClick={()=>navigate(`./${user._id}`)} role="button" className="text-blue-600 text-sm">{user.displayName}</h3>
                <p className="">{user.location}</p>
                <p className="text-gray-500 font-medium">{user.reputation}</p>
                <p className="text-blue-600">{user.tags}</p>
            </div>
        </div>
    )
}

export default UserProfileCard
