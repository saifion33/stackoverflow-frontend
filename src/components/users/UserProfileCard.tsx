import { IUser } from "../../Types"
interface IProps {
    user: IUser
}
const UserProfileCard = ({ user }: IProps) => {
    return (
        <div className="flex gap-2 items-start">
            <div>
                <img className="rounded" src={user.imageUrl} alt="" />
            </div>
            <div className="text-xs">
                <h3 className="text-blue-600 text-sm">{user.displayName}</h3>
                <p className="">{user.location}</p>
                <p className="text-gray-500 font-medium">{user.reputation}</p>
                <p className="text-blue-600">{user.tags}</p>
            </div>
        </div>
    )
}

export default UserProfileCard
