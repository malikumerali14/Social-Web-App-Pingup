import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { useClerk, UserButton } from '@clerk/clerk-react'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const user = dummyUserData
  const {signOut} = useClerk()

  return (
    <div className={`fixed md:relative z-120 h-screen w-60 xl:w-72 bg-white flex flex-col justify-between p-1 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 ease-in-out sm:translate-x-0`}>
      <div className='w-full'>
        <img onClick={() => navigate('/')} src={assets.logo} className='w-36 cursor-pointer px-6 py-3' />
        <hr className='border-gray-300 mb-8' />
        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link to='/create-post' className='flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer px-4 py-2 mx-7 my-4 text-white rounded-md'>
          <CirclePlus className='w-5 h-5' /> Create Post
        </Link>

      </div>

      <div className='px-5 py-5 flex justify-between items-center'>
        <div className='flex gap-2'>
          <UserButton />
          <div className='leading-none'>
            <h1 className='font-semibold'>{user.full_name}</h1>
            <p className='text-gray-600 text-sm'>@{user.username}</p>
          </div>
        </div>

        <LogOut onClick={signOut} className='text-gray-500 w-5 h-5 cursor-pointer' />
      </div>


    
    </div>
  )
}

export default Sidebar