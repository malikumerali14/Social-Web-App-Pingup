import React, { useState } from 'react'
import { MapPin, MessageCircle, Plus, UserPlus } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const ProfileCard = ({ user }) => {
    const currentUser = dummyUserData
    const navigate = useNavigate()

    const handleFollow = async () => {

    }

    const handleConnectionRequest = async () => {

    }

    return (
        <>
            <div className='my-12 shadow-lg'>
                <div
                    key={user._id}
                    className='border border-gray-300 rounded-lg flex flex-col items-center justify-center px-2 py-6'
                >
                    <span
                        onClick={() => navigate('/profile/' + user._id)}
                        className='flex flex-col items-center cursor-pointer'>
                        <img src={user.profile_picture} className='w-18 h-18 rounded-full' />
                        <h3>{user.full_name}</h3>
                        <p>@{user.username}</p>
                    </span>
                    <p className='text-sm text-gray-500 px-4 text-center my-2'>{user.bio}</p>

                    <div className='flex gap-2 text-sm my-1'>
                        <p className='rounded-full flex items-center gap-1 border border-gray-400 px-2 py-0.5'>
                            <MapPin className='w-4 h-4' />
                            {user.location}
                        </p>
                        <p className='rounded-full border border-gray-400 px-2 py-0.5'>
                            {user.followers.length} Followers
                        </p>
                    </div>

                    <div className='flex text-white w-full mt-4'>
                        <button
                            disabled={currentUser.followers.includes(user._id)}
                            className='w-full justify-center mx-2 px-4 py-2 rounded-md flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer'>
                            <UserPlus className='w-4 h-4 ' />
                            {currentUser.followers.includes(user._id) ? "Following" : "Follow"}
                        </button>

                        {/* Connection Request Button / Message Button  */}
                        <button className='flex items-center justify-center w-14 text-slate-500 border group rounded-md cursor-pointer active:scale-95 transition'>
                            {
                                currentUser.followers.includes(user._id) ?
                                    <MessageCircle className='w-5 h-55hover:scale-105 transition-all' />
                                    :
                                    <Plus className='w-5 h-5 hover:scale-105 transition-all' />
                            }
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard