import {ReactNode} from 'react'
import { NavLink } from 'react-router-dom'

interface Iprops{
    to:string,
    children:ReactNode,
    props?:object,
    extraActiveStyle?:string,
    extraIdleStyle?:string
}

const CustomNavLink = ({ to, children, props,extraActiveStyle,extraIdleStyle }:Iprops) => {
    return (
        <NavLink to={to} {...props} className={({ isActive }) => { return isActive ? `${extraActiveStyle} text-gray-900 w-full pl-10 py-1 text-left bg-gray-100 border-r-4 border-customOrange` : `${extraIdleStyle} hover:text-gray-900 w-full pl-10 py-1 text-left` }}  >
            {children}
        </NavLink>
    )
}

export default CustomNavLink