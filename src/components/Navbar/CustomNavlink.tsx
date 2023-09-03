import { NavLink } from 'react-router-dom'
import {ReactNode} from 'react'

interface Iprops{
    to:string,
    children:ReactNode,
    props?:object,
    extraActiveStyle?:string,
    extraIdleStyle?:string,
    onOptionClick?():void
}

const CustomNavLink = ({ to, children, props,extraActiveStyle,extraIdleStyle ,onOptionClick}:Iprops) => {
    return (
        <NavLink onClick={onOptionClick} to={to} {...props} className={({ isActive }) => { return isActive ? `${extraActiveStyle} text-gray-900 w-full pl-10 py-1 text-left bg-gray-100 border-r-4 border-customOrange` : `${extraIdleStyle} hover:text-gray-900 w-full pl-10 py-1 text-left` }}  >
            {children}
        </NavLink>
    )
}

export default CustomNavLink