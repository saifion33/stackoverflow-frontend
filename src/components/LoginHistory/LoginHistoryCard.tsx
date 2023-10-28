import { ILoginHistory } from "../../Types"

interface IProps {
    history: ILoginHistory
}

const LoginHistoryCard = ({ history }: IProps) => {
    const date = new Date(history.loggedInAt)
    return (
        <div className="p-3 rounded border-2 border-customOrange w-full lg:w-[48%] ">
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">Date: <span className="font-normal ml-auto text-slate-800 ">{`${date.toLocaleDateString('en-IN')} At ${date.toLocaleTimeString('en-IN')}`}</span></p>
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">IP Address: <span className="font-normal ml-auto text-slate-800 ">{history.ip}</span></p>
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">Browser: <span className="font-normal ml-auto text-slate-800">{history.browser}</span></p>
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">Operating System: <span className="font-normal ml-auto text-slate-800">{history.os}</span></p>
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">Device Type: <span className="font-normal ml-auto text-slate-800">{history.deviceType}</span></p>
            <p className="text-lg font-semibold text-slate-900 flex items-center justify-between">Loacation: <span className="font-normal ml-auto text-slate-800">{history.location}</span></p>
        </div>
    )
}

export default LoginHistoryCard