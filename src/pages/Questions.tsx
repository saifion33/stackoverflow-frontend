import RightBar from "../components/Questions/RightBar"
import { Outlet, useLocation } from "react-router-dom"

const Questions = () => {
    const location=useLocation()
    return (
        <section className="md3:p-3 p-1 md3:flex w-full h-full overflow-y-auto scrollbar-hide " >
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