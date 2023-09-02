import { useNavigate } from "react-router-dom"
import { IUser } from "../../Types"
import { useState } from "react"

interface IProps {
    user: IUser
}
const Avatar = ({ user }: IProps) => {
    const navigate = useNavigate()
    const [isImageError, setIsImageError] = useState(true)
    const handleImageError=()=>{
        setIsImageError(false)
    }
    return (
        <div role="button" onClick={() => navigate(`/users/${user._id}`)} className=" rounded-full bg-blue-600 overflow-hidden ">
            {
                (!user.imageUrl || !isImageError) && <p className="text-2xl text-stone-50 px-3 py-1 w-9 h-9 flex justify-center items-center">{
                    user.displayName.slice(0, 1).toUpperCase()
                }</p>
            }
            {
                (user.imageUrl && isImageError) && <img onError={handleImageError} src={user.imageUrl} alt={user.displayName} />
            }
        </div>
    )
}

export default Avatar