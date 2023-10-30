import UserProfileCard from '../../components/users/UserProfileCard'
import { useAppDispatch, useAppSelector } from '../../redux-hooks'
import { checkNetworkAndSession } from '../../utils/helpers'
import PageContainer from "../../components/PageContainer"
import { getUsers } from '../../redux/actions/users'
import { ICallData, IReciver } from '../../Types'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { makeCallApi } from '../../Api'
import loadingIcon from '../../assets/loading-icon.svg'
import NoInternet from '../../components/NoInternet'
import {toast} from 'react-toastify'

const VoipWrapper = () => {
    const dispatch = useAppDispatch()
    const user=useAppSelector(state=>state.auth.user?.profile);
    const { loading, users } = useAppSelector(state => state.users)
    const loggedInUser = useAppSelector(state => state.auth.user?.profile)
    const [isMakingCall, setIsMakingCall] = useState(false)
    const navigate = useNavigate()

    const makeCallFunction = (callType: 'audio' | 'video', reciver: IReciver) => {
        setIsMakingCall(true);
        makeCallApi({ callerName: loggedInUser?.displayName || 'unknown', to: reciver.fuid, callType })
            .then((res) => {
                const { callToken, callId }: ICallData = res.data.callData
                navigate(`/call/${callId}/${callType}/${encodeURIComponent(callToken)}/${reciver.fuid}/${reciver.name}`)
            })
            .catch(err =>{
                console.log(err);
                toast.warning(err.response.data.message,{autoClose:1500})
            })
            .finally(() => {
                setIsMakingCall(false);
            })
    }

    const makeAudioCall = (reciver: IReciver) => {
        checkNetworkAndSession('both', () => {
            makeCallFunction('audio', reciver)
        })
    }
    const makeVideoCall = (reciver: IReciver) => {
        checkNetworkAndSession('both', () => {
            makeCallFunction('video', reciver)
        })
    }

    useEffect(() => {
        checkNetworkAndSession('both', () => {
            dispatch(getUsers())
        })
    }, [dispatch]);
    return (
        <PageContainer>
            <div className='p-3 lg:p-8 relative min-h-full'>
                <h1 className='text-3xl font-semibold'>VOIP</h1>
                {(!loading && user) && <p className='text-xl font-semibold text-center py-4'>You can call Any Online user.</p>}
                {
                    (!loading && users) && <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 '>
                        {users.map(user => <UserProfileCard key={user._id} user={user} makeAudioCall={makeAudioCall} makeVideoCall={makeVideoCall} />)}

                    </div>
                }
                {
                    loading && <Loading />
                }
                {
                    isMakingCall && <div className='top-0 h-full right-0 left-0 bottom-0 p-3 lg:p-8 text-center bg-stone-50 bg-opacity-70 absolute flex justify-center items-center flex-col backdrop-blur-sm'>
                        <img className='w-14 md:w-28' src={loadingIcon} alt='loading icon' />
                        <h1 className='text-lg lg:text-2xl font-semibold animate-pulse '>Making call request to server...</h1>
                        <p>Please wait it can take time. sometime it can take upto 1 minutes.</p>

                    </div>
                }
                {
                    (!loading && !users && !navigator.onLine) && <NoInternet />
                }
                {
                    (!user && !loading) && <div className='text-xl text-center py-5'>
                        Please login to use VOIP.
                    </div>
                }
            </div>
        </PageContainer>
    )
}

export default VoipWrapper