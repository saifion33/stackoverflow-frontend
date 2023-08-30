import { useNavigate } from "react-router-dom"
import { IUser } from "../../Types"

interface IProps {
    user:IUser
}
const Avatar = ({ user}: IProps) => {
    const navigate=useNavigate()
    return (
        <div role="button" onClick={()=>navigate(`/users/${user._id}`)}  className="text-2xl w-9 h-9 py-1 flex justify-center items-center px-3 rounded-full bg-blue-600 text-stone-50">
            <p>{
                user.displayName.slice(0, 1).toUpperCase()
            }</p>
        </div>
    )
}

export default Avatar