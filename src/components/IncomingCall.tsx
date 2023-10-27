import { IoCall, IoVideocam } from 'react-icons/io5'
import { useCallRequest } from "../utils/customHooks"
import ringtone from '../assets/iPhone-14-Plus.mp3'
import { useEffect, useRef } from 'react'
import { child, ref, set } from 'firebase/database'
import { database } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
interface Iprops {
  fuid: string
}
const IncomingCall = ({ fuid }: Iprops) => {
  const onGoingCallRef = ref(database, `calls/${fuid}/onGoingCall`);
  const callRequestRef = ref(database, `calls/${fuid}/callRequest`);
  const statusRef = ref(database, `calls/${fuid}/status`);
  const call = useCallRequest(fuid)
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const playRingtone = () => {
    audioRef.current?.play()
  }
  const pauseRingtone = () => {
    audioRef.current?.pause()
  }
  const removeCallRequest = (state: 'accepted' | 'declined') => {
    set(child(callRequestRef, '/callState'), state).then(() => {
      setTimeout(() => {
        set(callRequestRef, {})
      }, 100);
    })
  }
  const acceptCall = () => {
    console.log('call..............',call)
    const callToken = call && encodeURIComponent(call?.callToken)
    set(statusRef, 'busy').then(() => {
      set(onGoingCallRef, call).then(async() => {
        removeCallRequest('accepted')
        navigate(`/call/${call?.callId}/${call?.callType}/${callToken}`)
      })
    })
  }
  const declineCall = () => {
    removeCallRequest('declined')
    set(statusRef, 'idle')
  }
  useEffect(() => {
    call ? playRingtone() : pauseRingtone()
  }, [call])
  return (
    <div className="flex justify-center relative">
      {
        call && <div className="fixed top-20 z-50 flex items-center gap-4  bg-green-100 shadow-md rounded p-4">
          <p>{call.callerName} is calling you</p>
          <audio src={ringtone} ref={audioRef} loop />
          <div className='flex items-center gap-3'>
            <div onClick={acceptCall} className='bg-green-500 w-fit p-2 cursor-pointer rounded-full'>
              {call.callType === 'video' ? <IoVideocam className="text-2xl" /> : <IoCall />}
            </div>
            <div onClick={declineCall} className='bg-red-500 w-fit p-2 cursor-pointer rounded-full'>
              {call.callType === 'video' ? <IoVideocam className="text-2xl" /> : <IoCall />}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default IncomingCall