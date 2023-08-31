import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa'
import { MdDangerous } from 'react-icons/md'
import { AiFillWarning } from 'react-icons/ai'
import { useAppSelector } from '../../redux-hooks'

const Alert = () => {
    const alerts = useAppSelector(state => state.alert.Alerts)
    const alertIcon = {
        info: { icon: <FaInfoCircle className="text-2xl text-blue-500" />, shadowColor: 'shadow-blue-200' },
        success: { icon: <FaCheckCircle className="text-2xl text-green-500" />, shadowColor: 'shadow-green-200' },
        warning: { icon: <AiFillWarning className="text-2xl text-yellow-400" />, shadowColor: 'shadow-yellow-200' },
        error: { icon: <MdDangerous className="text-2xl text-red-600" />, shadowColor: 'shadow-red-200' }
    }
    const AlertBody = <div className='fixed top-20 left-0 flex flex-col items-center gap-2  w-full z-70 '>
        {
            alerts.map(alert => {
                return <div key={alert.id} className={`  flex  items-center gap-2 z-50 py-2 px-3 shadow-md ${alertIcon[alert.type].shadowColor}  rounded bg-white `}>
                    {
                        alertIcon[alert.type].icon
                    }
                    <p>{alert.message}</p>
                </div>
            })
        }
    </div>
    return (
        AlertBody
    )
}

export default Alert