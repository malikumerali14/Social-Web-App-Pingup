import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
    return (
        <div className='w-full px-6 space-y-1 font-medium'>
            {
                menuItemsData.map(({ to, label, Icon }) => {
                    return <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) => `flex gap-3 items-center px-3 py-2 rounded-xl ${isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"}`}
                    >
                        <Icon className='w-5 h-6' />
                        {label}
                    </NavLink>
                })
            }

        </div>
    )
}

export default MenuItems