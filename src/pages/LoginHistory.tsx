import { useEffect } from "react"
import { getLoginHistoryApi } from "../Api"
import { useAppSelector } from "../redux-hooks"
import { useNavigate } from "react-router-dom"

const LoginHistory = () => {
    const user=useAppSelector(state=>state.auth.user?.profile)
    const navigate=useNavigate()
    const getLoginHistory = async () => {
        getLoginHistoryApi().then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(()=>{
        if (!user) {
            navigate('/users/login')
        }
    },[navigate, user])
    return (
        <div>
            <button onClick={getLoginHistory} >Get history</button>
        </div>
    )
}

export default LoginHistory