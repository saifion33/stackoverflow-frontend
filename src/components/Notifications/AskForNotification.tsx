import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { useAppDispatch } from '../../redux-hooks'
import { closeNotificationModal,requestNotificationPermission  } from '../../redux/slice/notificationSlice'


const AskForNotification = () => {
    const dispatch =useAppDispatch()
    return (
        createPortal(<div className="bg-white shadow-md p-3  rounded fixed top-0 left-0 z-50">
            <AiOutlineClose role="button" onClick={()=>dispatch(closeNotificationModal())} className="text-2xl ml-auto" />
            <div className='py-4'>
                <h2 className='text-slate-800 font-medium text-center '> Stackoverflow clone want to send you Notification.</h2>
                <p className='text-slate-700 text-center text-sm mt-4'>when a user upvote your Question Answer ,Accept your answer or you get a badge.</p>
            </div>
            <button onClick={()=>{dispatch(requestNotificationPermission())}} className='bg-customOrange py-1 px-4 rounded text-stone-50 block ml-auto'>OK</button>
        </div>, document.body)
    )
}

export default AskForNotification