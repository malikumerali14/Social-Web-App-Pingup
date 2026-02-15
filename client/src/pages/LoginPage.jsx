import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import {SignIn} from '@clerk/clerk-react'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row p-6 w-[92%] mx-auto'>
      <img src={assets.bgImage} className='w-full absolute top-0 left-0 -z-1 h-full object-cover' />

      {/* Left Side */}
      <div className='flex flex-1 flex-col px-6 py-6 justify-between'>
        <img src={assets.logo} className='w-24 object-contain sm:py-4 md:py-0' />
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.group_users} className='h-12 object-contain' /> 
            <div>
              <div className='flex'>
                {Array(5).fill(0).map((_, i) => (<Star key={i} className='fill-amber-500 text-transparent size-4 md:size-4.5' />))}
              </div>
              <div>
                <p className='font-semibold'>Used by 12k+ developers</p>
              </div>
            </div>

          </div>

          <h1 className='text-3xl md:text-6xl font-bold py-2 bg-gradient-to-r from-indigo-950 to-indigo-800 text-transparent bg-clip-text'>More than just friends <br /> truly connect</h1>
          <p className='text-xl md:text-2xl text-indigo-900'>connect with global community on pingup.</p>
        </div>

        <div>
          <span></span>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full flex flex-1 items-center justify-center p-6 mt-4 sm:p-10'>
        <SignIn />
      </div>


    </div>
  )
}

export default LoginPage