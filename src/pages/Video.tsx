import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from 'react-icons/tb'
import { AiFillPlayCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRef, useState, useEffect, ChangeEvent } from "react"
import { BsFillPauseFill, BsPlayFill } from 'react-icons/bs'
import PageContainer from "../components/PageContainer"
import { HiMiniSpeakerWave } from 'react-icons/hi2'
const Video = () => {
    const videosList = [
        'https://res.cloudinary.com/dwhwlxysm/video/upload/q_auto:best/pexels-kindel-media-7426331_720p_online-video-cutter.com_tayaa7.mp4',
        'https://res.cloudinary.com/dwhwlxysm/video/upload/q_auto:best/New_video2_xpehwm.mp4',
        'https://res.cloudinary.com/dwhwlxysm/video/upload/q_auto:best/clideo_editor_fdfa6f75e29242ea9c0f00ccaffbf13d_igrcri.mp4',
        'https://res.cloudinary.com/dwhwlxysm/video/upload/video_720p_u7xjvt.mp4',

    ]
    const [videoIndex, setVideoIndex] = useState(0);
    const [videoUrl, setVideoUrl] = useState(videosList[0])
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [videoDuration, setVideoDuration] = useState<number>(0)
    const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0)
    const [volume, setVolume] = useState<number>(1)
    const [isVolumeHidden, setIsVolumeHidden] = useState(true);
    const [progress, setProgress] = useState<number>(0)
    const progressBarRef = useRef<HTMLDivElement>(null)
    const [buffring, setBuffring] = useState(false);


    const handleSelectVideo = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = e.target.files && e.target.files[0]
        if (selectedVideo) {
            const selectedVideoUrl = URL.createObjectURL(selectedVideo)
            setVideoUrl(selectedVideoUrl)
            setProgress(0)
            setIsPlaying(false)
            setVideoIndex(0)
        }
    }

    const handleNextVideo = () => {
        const lastIndex = videosList.length - 1;
        if (videoIndex !== lastIndex) {
            console.log()
            setVideoIndex(p => {
                setVideoUrl(videosList[p + 1])
                return p + 1
            });

        }
        else {
            setVideoIndex(0);
            setVideoUrl(videosList[0])
        }
        setProgress(0)
        setIsPlaying(false);
    }

    const handlePrevVideo = () => {
        if (videoIndex !== 0) {
            setVideoUrl(videosList[videoIndex - 1])
            setVideoIndex(p => p - 1);
        }
        else {
            const lastIndex = videosList.length - 1;
            setVideoIndex(lastIndex);
            setVideoUrl(videosList[lastIndex])
        }
        setProgress(0)
        setIsPlaying(false)
    }

    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const volumeRange = Number(e.target.value)
        setVolume(volumeRange)
        if (videoRef.current) {
            videoRef.current.volume = volumeRange
        }
    }

    const handleLoadingFinish = () => {
        setVideoDuration(videoRef.current?.duration || 0);
        setIsLoading(false);
    }

    const handleTimeUpdate = () => {
        const currentTime = videoRef.current?.currentTime || 0
        setVideoCurrentTime(currentTime);
        if (videoRef.current?.duration) {
            setProgress((currentTime / videoRef.current.duration) * 100)
        }
    }

    const handleVideoEnded = () => {
        videoRef.current?.pause();
        setIsPlaying(false);
    }

    const handlePlayPause = () => {
        setIsPlaying(p => {
            if (p) {
                videoRef.current?.pause();
            }
            else {
                videoRef.current?.play();
            }
            return !p
        })
    }

    const seekLeft = () => {
        const currentVideoTime = videoRef.current?.currentTime || 0
        if (videoRef.current) {
            videoRef.current.currentTime = currentVideoTime - 10
        }
    }
    const seekRight = () => {
        const currentVideoTime = videoRef.current?.currentTime || 0
        if (videoRef.current) {
            videoRef.current.currentTime = currentVideoTime + 10
        }
    }

    const handlePlayerClick = (e: React.MouseEvent) => {

        const clickPostion = e.nativeEvent.offsetX
        const playerWidth = videoRef.current?.clientWidth
        const clickPostionPercent = clickPostion / (playerWidth || 0) * 100
        const centerStartPostion = 42
        const centerEndPostion = 58

        if (clickPostionPercent >= centerStartPostion && clickPostionPercent <= centerEndPostion) {
            handlePlayPause()
        }
        else if (clickPostionPercent < centerStartPostion) {
            seekLeft()
        }
        else if (clickPostionPercent > centerEndPostion) {
            seekRight()
        }
    }
    const handleProgressBarClick = (e: React.MouseEvent) => {
        const clickPostion = e.nativeEvent.offsetX
        const progressBarWidth = progressBarRef.current?.clientWidth
        const clickPostionPercent = clickPostion / (progressBarWidth || 0) * 100
        const clickedTime = (videoDuration / 100) * clickPostionPercent
        if (videoRef.current) {
            videoRef.current.currentTime = clickedTime;
        }
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        return formattedTime;
    }


    useEffect(() => {
        const videoPlayer = videoRef.current
        const handleLoadingStart = () =>{
            
            setIsLoading(true)
        }
        const handleBuffring = () => {
            setBuffring(true);
        }
        const handlePlaying = () => {
            setBuffring(false);
        }
        if (videoPlayer) {
            videoPlayer.addEventListener('loadstart',handleLoadingStart)
            videoPlayer.addEventListener('canplaythrough', handleLoadingFinish);
            videoPlayer.addEventListener('timeupdate', handleTimeUpdate)
            videoPlayer.addEventListener('ended', handleVideoEnded)
            videoPlayer.addEventListener('waiting', handleBuffring)
            videoPlayer.addEventListener('stalled', handleBuffring)
            videoPlayer.addEventListener('playing', handlePlaying)

        }
        return () => {
            videoPlayer?.removeEventListener('loadstart',handleLoadingStart)
            videoPlayer?.removeEventListener('canplaythrough', handleLoadingFinish);
            videoPlayer?.removeEventListener('timeupdate', handleTimeUpdate)
            videoPlayer?.removeEventListener('ended', handleVideoEnded)
            videoPlayer?.removeEventListener('waiting', handleBuffring)
            videoPlayer?.removeEventListener('stalled', handleBuffring)
            videoPlayer?.removeEventListener('playing', handlePlaying)
        }
    }, [])

    return (
        <PageContainer>
            <div className="h-full flex justify-center items-center relative mx-2 lg:mx-10 ">
                <label className="absolute top-10 right-4 z-50 bg-customOrange text-stone-50 py-1 px-2 rounded flex items-center gap-1" htmlFor="select-video">Select Video <AiFillPlayCircle /></label>
                <input className="hidden" onChange={handleSelectVideo} type="file" name="select-video" id="select-video" accept="video/*" multiple={false} />
                {(buffring || isLoading) && <div className="text-7xl animate-spin text-stone-50 p-3 absolute "><AiOutlineLoading3Quarters /></div>}
                <video onDoubleClick={handlePlayerClick} className="w-full " ref={videoRef} src={videoUrl} ></video>
                <div className="absolute bottom-0 left-0 w-full bg-opacity-50  flex justify-center items-end gap-3">
                    {
                        !isLoading && <div className="my-5 flex flex-col justify-center items-center bg-slate-800 bg-opacity-50 w-full">
                            <div className="text-stone-50 flex justify-between gap-4 items-center px-4 w-full">
                                <p>{formatTime(videoCurrentTime)}</p>
                                <div onClick={handleProgressBarClick} ref={progressBarRef} className="w-full cursor-pointer h-2 bg-stone-50 bg-opacity-40 relative rounded-full overflow-hidden">
                                    <div style={{ width: `${progress}%` }} className={` h-full bg-stone-50 rounded-full`}></div>
                                </div>
                                <p>{formatTime(videoDuration)}</p>
                                <div className="relative">
                                    {!isVolumeHidden && <input step={0.05} value={volume} onChange={handleVolumeChange} min={0} max={1} className="  -rotate-90 absolute bottom-20 -left-16 accent-stone-50" type="range" name="volume" id="volume" />}
                                    <HiMiniSpeakerWave className="cursor-pointer" onClick={() => setIsVolumeHidden(p => !p)} />
                                </div>
                            </div>

                            <div className=" text-stone-50 flex items-center gap-5 ">
                                <TbPlayerTrackPrevFilled onClick={handlePrevVideo} className="text-3xl cursor-pointer" />
                                <div className=" cursor-pointer text-5xl " onClick={handlePlayPause} >
                                    {
                                        isPlaying && <BsFillPauseFill />
                                    }
                                    {
                                        !isPlaying && <BsPlayFill />
                                    }
                                </div>
                                <TbPlayerTrackNextFilled onClick={handleNextVideo} className="text-3xl cursor-pointer" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </PageContainer>
    )
}

export default Video