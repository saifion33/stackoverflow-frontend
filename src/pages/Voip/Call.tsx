import { useState, useRef, useEffect, useCallback } from 'react'
import PageContainer from "../../components/PageContainer"
import AgoraRTC, { ICameraVideoTrack, IMicrophoneAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser, } from "agora-rtc-sdk-ng";
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux-hooks';
import { child, get, off, onValue, ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { IoCall, IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { BsArrowRepeat, BsFillMicFill, BsFillMicMuteFill, } from 'react-icons/bs';
const client: IAgoraRTCClient = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

let audioTrack: IMicrophoneAudioTrack;
let videoTrack: ICameraVideoTrack;
const Call = () => {
    const user = useAppSelector(state => state.auth.user?.profile)
    const navigate = useNavigate()
    const { callToken, callId, callType: type, reciverFuid, reciverName } = useParams();
    const onGoingCallRef = ref(database, `/calls/${reciverFuid ? reciverFuid : user?.fuid}/onGoingCall`)
    const [isRemoteUserJoined, setIsRemoteUserJoined] = useState(false);
    const [callType, setcallType] = useState<string>(type || 'audio')
    const statusRef = ref(database, `/calls/${user?.fuid}/status`)
    const [callerName, setCallerName] = useState<null | string>(null)
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);

    const hangCall = () => {
        set(child(onGoingCallRef, '/callState'), 'hang').then(() => {

        })

    }
    const turnOnCamera = useCallback(async (flag: boolean) => {
        setIsVideoOn(flag);
        if (videoTrack) {
            return videoTrack.setEnabled(flag);
        }
        if (flag) {
            videoTrack = await AgoraRTC.createCameraVideoTrack();
            videoTrack.play("camera-video");
        }
    }, [])

    const turnOnMicrophone = useCallback(async (flag: boolean) => {
        setIsAudioOn(flag);
        if (audioTrack) {
            return audioTrack.setEnabled(flag);
        }
        if (flag) {
            audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        }
        // audioTrack.play();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isJoined, setIsJoined] = useState(false);
    const channel = useRef("");
    const appid = useRef("ee1bedf4fa6f43b2adac0e2d9c4a32fd");
    // you can apply token follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
    const token = useRef("");

    const joinChannel = useCallback(async () => {
        if (!channel.current) {
            channel.current = "react-room";
        }

        if (isJoined) {
            await leaveChannel();
        }

        client.on("user-published", onUserPublish);

        await client.join(
            appid.current,
            channel.current,
            token.current || null,
            null
        );
        setIsJoined(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const leaveChannel = async () => {
        setIsJoined(false);
        await client.leave();
    };

    const onUserPublish = async (
        user: IAgoraRTCRemoteUser,
        mediaType: "video" | "audio"
    ) => {
        if (mediaType === "video") {
            const remoteTrack = await client.subscribe(user, mediaType);
            remoteTrack.play("remote-video");
        }
        if (mediaType === "audio") {
            const remoteTrack = await client.subscribe(user, mediaType);
            remoteTrack.play();
        }
        setIsRemoteUserJoined(true);
    };


    const joinCall = useCallback(async (callType: string) => {
        get(onGoingCallRef).then(snap => {
            if (snap.exists()) {
                setCallerName(snap.val().callerName);
            }
        })
        if (callType === 'video') {
            await turnOnCamera(true);
            setIsVideoOn(true);
            await turnOnMicrophone(true);
            setIsAudioOn(true);
            if (!isJoined) {
                joinChannel().then(async () => {
                    await client.publish(videoTrack);
                    await client.publish(audioTrack);
                })
            }

        } else if (callType === 'audio') {
            await turnOnMicrophone(true);
            setIsAudioOn(true);
            if (!isJoined) {
                joinChannel().then(async () => {
                    await client.publish(videoTrack);
                    await client.publish(audioTrack);
                })
            }
            if (!callType.includes('/audio')) {
                const newUrl = window.location.pathname.replace('/video', '/audio');
                navigate(newUrl);
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnOffCamera = async () => {
        if (isVideoOn) {
            await turnOnCamera(false);
            // setIsVideoPubed(false);
            setIsVideoOn(false);
        } else {
            await turnOnCamera(true);
            // setIsVideoPubed(true);
            setIsVideoOn(true);
        }
    }
    const handleMicOnOff = async () => {
        if (isAudioOn) {
            turnOnMicrophone(false)
                .then(() => {
                    setIsAudioOn(false);
                }).catch(err => console.error(err));
            // setIsAudioPubed(false);

        } else {
            turnOnMicrophone(true)
                .then(() => {
                    setIsAudioOn(true);
                }).catch(err => console.error(err));
        }
    }
    const handleSwitchCall = async () => {
        if (callType == 'video') {
            set(child(onGoingCallRef, '/callType'), 'audio').then(async () => {
                const newUrl = window.location.pathname.replace('/video', '/audio');
                navigate(newUrl, { replace: true });
                setcallType('audio');
                await turnOnCamera(false);
            }).catch(err => {
                console.log(err);
            })
           
        }
        else if (callType == 'audio') {
            set(child(onGoingCallRef, '/callType'), 'video').then(async () => {
                const newUrl = window.location.pathname.replace('/audio', '/video');
                navigate(newUrl, { replace: true });
                setcallType('video');
                await turnOnCamera(true);
                await client.publish(videoTrack)
            }).catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if (callToken && callId && callType) {
            channel.current = callId;
            token.current = callToken;
            joinCall(callType)

            onValue(onGoingCallRef, async (snap) => {
                if (snap.exists()) {
                    if (snap.val().callState === 'hang') {
                        set(onGoingCallRef, null);
                        set(statusRef, 'idle');
                        leaveChannel().then(() => {
                            turnOnMicrophone(false).catch(err => console.error(err));
                            turnOnCamera(false).then(async () => {
                                navigate('/voip')
                                window.location.reload();
                            }).catch(err => console.error(err));
                        })
                        return
                    }
                    
                    if (snap.val().callType === 'video') {
                        await turnOnCamera(true);
                        await client.publish(videoTrack);
                        setIsVideoOn(true);
                        const newUrl = window.location.pathname.replace('/audio', '/video');
                        navigate(newUrl, { replace: true });
                    } else if (snap.val().callType === 'audio') {
                        await turnOnCamera(false);
                        setIsVideoOn(false);
                        await client.unpublish(videoTrack);
                        await turnOnMicrophone(true);
                        await client.publish(audioTrack);
                        const newUrl = window.location.pathname.replace('/video', '/audio');
                        navigate(newUrl, { replace: true });
                    }
                    setcallType(snap.val().callType)

                }
            })
        }
        return () => {
            off(child(onGoingCallRef, '/callType'))
            off(ref(database, `/calls/${reciverFuid}/onGoingCall`))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <PageContainer>
            <div>
                <h1 className='text-center py-5 text-2xl font-semibold'>Video And Audio Call</h1>
                <div>
                    <div className="right-side flex justify-center">
                        <div className='relative w-full max-w-xl h-fit'>
                            <video className={`border-2 border-slate-900 max-w-full ${callType == 'video' ? 'block' : 'hidden'} ${isRemoteUserJoined ? 'w-20' : 'w-full'} absolute right-2 top-2`} id="camera-video" ></video>
                            <video className={`w-full max-w-full ${callType == 'video' ? 'block' : 'hidden'} `} id="remote-video" ></video>
                            <div className=' bg-slate-950'>
                                {(callType == 'audio' && callerName) && <div className='text-stone-50 w-full h-[400px] bg-blue-100 text-5xl flex flex-col gap-4 justify-center items-center'>
                                    <h1 className='p-2 bg-slate-900 rounded-full w-16 h-16 text-center'>{callerName.slice(0, 1).toUpperCase()}</h1>
                                    <div className='flex gap-2 items-center'>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                    </div>
                                </div>}
                                {(callType == 'audio' && reciverName) && <div className='text-stone-50 w-full h-[400px] bg-blue-100 text-5xl flex flex-col gap-4 justify-center items-center'>
                                    <h1 className='p-2 bg-slate-900 rounded-full w-16 h-16 text-center'>{reciverName.slice(0, 1).toUpperCase()}</h1>
                                    <div className='flex gap-2 items-center'>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                        <span className='w-2 h-2 block bg-slate-900 rounded-full animate-bounce'></span>
                                    </div>
                                </div>}
                            </div>

                            <div className='absolute bottom-0 w-full flex items-center gap-3 p-4 bg-slate-950 bg-opacity-50 '>
                                {
                                    isJoined && <div onClick={handleSwitchCall} className='bg-blue-500 rounded-md p-1 text-3xl w-fit '>
                                        <BsArrowRepeat />
                                    </div>
                                }

                                <div onClick={handleMicOnOff} className='bg-blue-500 rounded-md p-1 text-3xl w-fit '>
                                    {isAudioOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
                                </div>
                                {
                                    callType == 'video' && <div onClick={handleOnOffCamera} className='bg-blue-500 rounded-md p-1 text-3xl w-fit '>
                                        {isVideoOn ? <IoVideocam /> : <IoVideocamOff />}
                                    </div>
                                }
                                {isJoined && <div onClick={hangCall} className='bg-red-500 rounded-md p-1  cursor-pointer text-3xl w-fit'>
                                    <IoCall />
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageContainer>
    )
}

export default Call