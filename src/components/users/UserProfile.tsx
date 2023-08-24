import { usersList } from "../../utils/helpers"
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { FaLocationDot } from 'react-icons/fa6'
import bronzeBadge from '../../assets/bronze-badge.svg'
import silverBadge from '../../assets/silver-badge.svg'
import goldBadge from '../../assets/gold-badge.svg'

const UserProfile = () => {
    const user = usersList[1]
    return (
        <section>
            <header>
                <div className=" space-y-3 py-4">
                    <img src={user.imageUrl} alt={user.displayName} />
                    <div>
                        <h1 className="text-3xl">{user.displayName}</h1>
                        <div className="flex items-center gap-2 text-gray-600 py-1 ">
                            <LiaBirthdayCakeSolid className="text-xl" /> joined {user.joinedOn}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 py-1">
                            <FaLocationDot className="text-xl" /> {user.location}
                        </div>
                    </div>
                </div>
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
                        <p>
                            {user.about}
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl ">Badges</h2>
                    <div className="sm:flex gap-2 ">
                        <div className="border-[1px] rounded p-3 flex justify-between flex-wrap text-gray-600 gap-2 sm:min-w-[244px] sm:max-w-[244px]">
                            <div className="flex gap-3">
                                <img src={bronzeBadge} alt="bronze badge" />
                                <div className="w-full">
                                    <p className="text-2xl font-semibold text-gray-900">1</p>
                                    <p >Bronze Badges</p>
                                </div>
                            </div>
                            <div className="pt-2 flex  flex-wrap gap-3">
                                <div className="py-1 px-3 rounded-sm flex items-center gap-1 bg-[#e2bc9b] text-slate-900 text-xs"><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span> <p>Student</p></div>
                            </div>
                        </div>
                        <div className="border-[1px] rounded p-3 flex justify-between flex-wrap text-gray-600 gap-2 sm:min-w-[244px] sm:max-w-[244px]">
                            <div className="flex gap-3">
                                <img src={silverBadge} alt="silver badge" />
                                <div className="w-full">
                                    <p className="text-2xl font-semibold text-gray-900">1</p>
                                    <p >Silver Badges</p>
                                </div>
                            </div>
                            <div className="pt-2 flex  flex-wrap gap-3">
                                <div className="py-1 px-3 rounded-sm flex items-center gap-1 bg-[#B3B8BC] text-slate-900 text-xs"><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span> <p>Student</p></div>
                            </div>
                        </div>
                        <div className="border-[1px] rounded p-3 flex justify-between flex-wrap text-gray-600 gap-2 sm:min-w-[244px] sm:max-w-[244px]">
                            <div className="flex gap-3">
                                <img src={goldBadge} alt="gold badge" />
                                <div className="w-full">
                                    <p className="text-2xl font-semibold text-gray-900">1</p>
                                    <p >Gold Badges</p>
                                </div>
                            </div>
                            <div className="pt-2 flex  flex-wrap gap-3">
                                <div className="py-1 px-3 rounded-sm flex items-center gap-1 bg-[#FFCC00] text-slate-900 text-xs"><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span> <p>Student</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl pt-2">Tages</h2>
                    <div className="border-[1px] rounded divide-y sm:max-w-[244px] ">
                        {
                            user.tags.split(',').map(tag => {
                                return <div className="p-2" key={tag}>
                                    <h2 className="text-[rgb(42,59,79)] bg-blue-100 w-fit py-[1px] px-2 rounded-md ">{tag}</h2>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserProfile