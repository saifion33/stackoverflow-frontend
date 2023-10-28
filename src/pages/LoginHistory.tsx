import { useEffect, useState } from "react"
import { getLoginHistoryApi } from "../Api"
import { useAppSelector } from "../redux-hooks"
import { useNavigate } from "react-router-dom"
import { ILoginHistory } from "../Types"
import Loading from "../components/Loading"
import LoginHistoryCard from "../components/LoginHistory/LoginHistoryCard"
import { BiArrowBack } from "react-icons/bi"
import { checkNetworkAndSession } from "../utils/helpers"

const LoginHistory = () => {
    const user = useAppSelector(state => state.auth.user?.profile)
    const [loading, setLoading] = useState(false);
    const [loginHistory, setLoginHistory] = useState<null | ILoginHistory[]>(null);
    const navigate = useNavigate()

    const getLoginHistory = () => {
        setLoading(true);
        getLoginHistoryApi()
            .then(res => {
                setLoginHistory(res.data.loginHistory)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!user) {
            return navigate('/users/login')
        }
        checkNetworkAndSession('both',()=>getLoginHistory())
    }, [navigate, user])

    return (
        <div>
            <div className="text-lg p-2 border-b-[1px] mb-4 sticky top-0 left-0 bg-stone-50 flex items-center justify-between"> 
                <p>{user?.displayName}</p>
                <p className="">Total Login Count: {loginHistory && loginHistory.length}</p>
            </div>
            {loginHistory && <div className="flex flex-wrap gap-4 justify-center ">
                {loginHistory.map(history => <LoginHistoryCard history={history} key={history._id} />)}
            </div>}
            {
                loading && <Loading />
            }
        </div>
    )
}

export default LoginHistory