import { showAlertWithTimeout } from '../../redux/slice/alertSlice'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { useNavigate, useParams } from "react-router-dom"
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { FaLocationDot, FaPen } from 'react-icons/fa6'
import userIcon from '../../assets/user-icon.svg'
import { useState, useEffect } from "react"
import { getUserById } from '../../Api'
import NoInternet from '../NoInternet'
import BadgeCard from "./BadgeCard"
import { IUser } from '../../Types'
import Loading from '../Loading'

const UserProfile = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const loggedInUserId = useAppSelector(state => state.auth.user?.profile?._id)
    const [isImageError, setImageError] = useState(true);
    const [loading, setLoading] = useState(false)
    const isAdmin = user?._id === loggedInUserId;
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleImageLoadingFailed = () => {
        setImageError(false)
    }
    const getUser = async (userId: string) => {
        setLoading(true)
        try {
            const user = await getUserById(userId)
            setUser(user.data.data)

        } catch (error) {
            console.log(error)
            const reqError = error as { response: { data: { status: number, message: string } } }
            dispatch(showAlertWithTimeout({ message: reqError.response.data.message, type: 'error' }))
        }
        setLoading(false)
    }
    useEffect(() => {
        if (id && navigator.onLine) {
            getUser(id)
        }
        // eslint-disable-next-line 
    }, [])
    return (
        <section>
            {
                (!loading && user) && <div>
                    <header className="flex justify-between py-4">
                        <div className=" space-y-3 ">
                            <div className='bg-gray-200 rounded w-32 h-32'>
                                {(user.imageUrl && isImageError) && <img className='w-32 rounded' onError={handleImageLoadingFailed} src={user.imageUrl} alt={user.displayName} />}
                                {(!user.imageUrl || !isImageError) && <img className='w-32 rounded' src={userIcon} alt={user.displayName} />}
                            </div>
                            <div>
                                <h1 className="text-3xl">{user.displayName}</h1>
                                <div className="flex items-center gap-2 text-gray-600 py-1 ">
                                    <LiaBirthdayCakeSolid className="text-xl" /> joined {new Date(user.joinedOn).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 py-1">
                                    <FaLocationDot className="text-xl" /> {user.location}
                                </div>
                            </div>
                        </div>
                        {
                            isAdmin && <div>
                                <button onClick={() => navigate(`/users/edit/${user._id}`)} className="flex items-center gap-1 rounded border-[1px] px-2 py-1" > <FaPen /> Edit Profile</button>
                            </div>
                        }
                    </header>
                    <div>
                        <div className="flex gap-8 flex-col-reverse sm:flex-row">
                            <div className="">
                                <h2 className="text-2xl py-2">Stats</h2>
                                <div className="border-[1px] rounded p-3 flex justify-center sm:justify-between flex-wrap text-gray-600 gap-2 text-center  sm:max-w-[244px]">
                                    <div className="w-[48%]">
                                        <p className="text-gray-900 font-medium">{user.reputation}</p>
                                        reputation
                                    </div>
                                    <div className="w-[48%]">
                                        <p className="text-gray-900 font-medium">{user.questionCount}</p>
                                        questions
                                    </div>
                                    <div className="w-[48%]">
                                        <p className="text-gray-900 font-medium">{user.answerCount}</p>
                                        answers
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl py-2">About</h2>
                                <p className='whitespace-pre-line'>
                                    {user.about}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl ">Badges</h2>
                            <div className="space-y-3 sm:space-y-0 sm:flex gap-2 ">
                                {
                                    user.badges && user.badges.map(badge => <BadgeCard isAdmin={isAdmin} key={badge.name} badge={badge} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl pt-2">Tages</h2>
                        {
                            user.tags && <div className="border-[1px] rounded divide-y sm:max-w-[244px] ">
                                {user.tags.split(',').map(tag => {
                                    return <div className="p-2" key={tag}>
                                        <h2 className="text-[rgb(42,59,79)] bg-blue-100 w-fit py-[1px] px-2 rounded-md ">{tag}</h2>
                                    </div>
                                })}
                            </div>
                        }
                        {
                            !user.tags && <div>0 Tags</div>
                        }
                    </div>
                </div>
            }
            
            {
                loading && <Loading/>
            }
            {
                (!loading && !user && !navigator.onLine) && <NoInternet/>
            }


        </section >
    )
}

export default UserProfile