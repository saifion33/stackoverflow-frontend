import { ReactNode } from "react"
import NavContentBox from "./Navbar/NavContentBox"

interface Iprops {
  children: ReactNode
}

const PageContainer = ({ children }: Iprops) => {
  return (
    <div className="flex justify-center">
      <div className='max-w-7xl w-full flex p-1 md3:p-4'>
        <div className='hidden sm:block'>
          <NavContentBox isOpenFromPage />
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageContainer