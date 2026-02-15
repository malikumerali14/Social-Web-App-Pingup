import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Menu, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const LayoutPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = dummyUserData
  return user ? (
    <>
      <div className='flex min-h-screen w-full relative'>
        <div className=''>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        </div>

        <div className='flex-1 bg-slate-100'>
          <Outlet />
        </div>

        {
          sidebarOpen ?
            <X className='hover:cursor-pointer block absolute top-2 right-0 sm:hidden' onClick={() => setSidebarOpen(false)} />
            :
            <Menu className='hover:cursor-pointer absolute right-0 top-2 sm:hidden' onClick={() => setSidebarOpen(true)} />
        }
      </div>
    </>

  ) : (
    <Loading />
  )
}

export default LayoutPage