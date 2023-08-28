
import { createPortal } from 'react-dom'
import { useAppSelector } from '../../redux-hooks'
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import { MdDangerous } from 'react-icons/md'
import { AiFillWarning } from 'react-icons/ai'

const Alert = () => {
    const { isAlertVisible, alertMessage, alertType } = useAppSelector(state => state.alert)
    const alertIcon = {
        info: {icon:<FaInfoCircle className="text-2xl text-blue-500" />,shadowColor:'shadow-blue-200'},
        success: {icon:<FaCheckCircle className="text-2xl text-green-500" />,shadowColor:'shadow-green-200'},
        warning: {icon:<AiFillWarning className="text-2xl text-yellow-400" />,shadowColor:'shadow-yellow-200'},
        error: {icon:<MdDangerous className="text-2xl text-red-600" />,shadowColor:'shadow-red-200'},
    }
    const AlertBody = <div className='fixed  top-12 left-0 flex justify-center items-center w-full z-50 py-5'>
        <div className={`flex items-center gap-2 z-50 py-2 px-3 shadow-md ${alertIcon[alertType].shadowColor}  rounded bg-white `}>
            {
                alertIcon[alertType].icon
            }
            <p>{alertMessage}</p>
        </div>
    </div>
    return (
        isAlertVisible && createPortal(AlertBody, document.getElementById('portals') as Element)
    )
}

export default Alert