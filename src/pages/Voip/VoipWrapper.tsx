import { useEffect } from 'react'
import PageContainer from "../../components/PageContainer"
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { getUsers } from '../../redux/actions/users';
import Loading from '../../components/Loading';
import UserProfileCard from '../../components/users/UserProfileCard';
import { makeCallApi } from '../../Api';
import { ICallData, IReciver } from '../../Types';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import {toast} from 'react-toastify'
import { checkNetworkAndSession } from '../../utils/helpers';
import { database } from '../../firebase/firebase';

const VoipWrapper = () => {
    const dispatch = useAppDispatch()
    const { loading, users } = useAppSelector(state => state.users)
    const loggedInUser = useAppSelector(state=>state.auth.user?.profile)
    const navigate=useNavigate()

    const makeCallFunction = (callType: 'audio' | 'video',reciver:IReciver) => {
        const callRequestStateRef=ref(database,`/calls/${reciver.fuid}/callRequest/state`)
        makeCallApi({ callerName: loggedInUser?.displayName || 'unknown', to:reciver.fuid, callType })
            .then((res) => {
                const { callToken, callId }: ICallData = res.data.callData
                navigate(`/call/${callId}/${callType}/${encodeURIComponent(callToken)}/${reciver.fuid}/${reciver.name}`)
                onValue(callRequestStateRef, (snap) => {
                    console.log('This is call state', snap.val());
                    if (snap.val()) {
                        if (snap.val() === 'default') {
                            toast.info('calling...', { autoClose: 2000 })
                            setTimeout(() => {
                                if (snap.val() === 'default') {
                                    toast.warning('User not Answering...', { autoClose: 2000 })
                                }
                            }, 1000 * 30)
                        } else if (snap.val() === 'accepted') {
                            toast.success('call Accepted', { autoClose: 2000 })
                        } else if (snap.val() === 'declined') {
                            navigate('/users')
                            toast.warning('call Declined', { autoClose: 2000 })
                        }
                    }
                })
            })
            .catch(err => console.log(err))
    }

    const makeAudioCall=(reciver:IReciver)=>{
        checkNetworkAndSession('both',()=>{
            makeCallFunction('audio',reciver)
        })
    }
    const makeVideoCall=(reciver:IReciver)=>{
        checkNetworkAndSession('both',()=>{
            makeCallFunction('video',reciver)
        })
    }

    useEffect(() => {
        navigator.onLine && dispatch(getUsers());
    }, [dispatch]);
    return (
        <PageContainer>
            <div className='p-3 lg:p-8'>
                <h1 className='text-3xl font-semibold'>VOIP</h1>
                {!loading && <p className='text-xl font-semibold text-center py-4'>You can call Any Online user.</p>}
                {
                    (!loading && users) && <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 '>
                            {users.map(user => <UserProfileCard key={user._id} user={user} makeAudioCall={makeAudioCall} makeVideoCall={makeVideoCall} />)}
                    </div>
                }
                {
                    loading && <Loading />
                }
            </div>
        </PageContainer>
    )
}

export default VoipWrapper