
import { Outlet, useLocation } from "react-router-dom"
import RightBar from "../components/Questions/RightBar"

const Questions = () => {
    const location=useLocation()
    return (
        <section className="md3:p-3 p-1 md3:flex w-full " >
            <div className="w-full">
                <Outlet/>
            </div>
            <div className={location.pathname==='/questions/ask'?'hidden':'block'} >
                <RightBar />
            </div>
        </section>
    )
}

export default Questions