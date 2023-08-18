import { ReactNode } from "react"
import NavContentBox from "./Navbar/NavContentBox"
import { useLocation } from "react-router-dom"

interface Iprops {
  children: ReactNode
}

const PageContainer = ({ children }: Iprops) => {
  const location = useLocation()
  return (
    <div className="flex justify-center ">
      <div className='max-w-7xl w-full flex  p-1 md3:p-4 '>
        <div className={`hidden  ${location.pathname !== '/questions/ask' ? 'sm:block' : ''}`}>
          <NavContentBox isOpenFromPage />
        </div>
        <div className="h-[88vh] w-full overflow-y-auto scrollbar-hide  ">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageContainer