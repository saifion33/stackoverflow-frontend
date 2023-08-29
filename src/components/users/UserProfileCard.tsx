import { IBasicUserDetails } from "../../Types"
import userIcon from '../../assets/user-icon.svg'
interface IProps {
    user: IBasicUserDetails
}
const UserProfileCard = ({ user }: IProps) => {
    return (
        <div className="flex gap-2 items-start">
            <div className="w-16 h-16 rounded overflow-hidden">
                {user.imageUrl && <img className="max-w-full" src={user.imageUrl} alt={user.displayName} />}
                {!user.imageUrl && <img className="max-w-full " src={userIcon} alt={user.displayName} />}
            </div>
            <div className="text-xs">
                <h3 role="button" className="text-blue-600 text-sm">{user.displayName}</h3>
                <p className="">{user.location}</p>
                <p className="text-gray-500 font-medium">{user.reputation}</p>
                <p className="text-blue-600">{user.tags}</p>
            </div>
        </div>
    )
}

export default UserProfileCard
