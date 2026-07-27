import { Calendar, MapPin, PenBox, User, Verified } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {



    return (
        <>
            <div className='relative'>
                <div className='flex flex-col md:flex-row '>

                    <div className='w-32 h-32 border-white '>
                        <img src={user.profile_picture} className='absolute w-32 h-32 -top-12 rounded-full border border-white p-1 bg-white' />
                    </div>

                    <div className='w-full px-8 py-4'>
                        <div className='flex flex-col md:flex-row items-start justify-between w-full '>
                            <div className='pb-2'>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='text-2xl font-bold '>{user.full_name}</h1>
                                    <Verified className='text-blue-500' />
                                </div>
                                <p className='text-gray-600'>
                                    {user.username ? `@${user.username}` : "Add a username"}
                                </p>

                            </div>
                            {!profileId && <button 
                            onClick={() => setShowEdit(true)}
                            className='flex gap-2 items-center font-semibold border border-slate-200 shadow-md px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100 transition-all'>
                                <PenBox className='w-4 h-4' />
                                Edit
                            </button>}

                        </div>

                        <p className='text-sm text-gray-700'>{user.bio}</p>

                        <div className='flex gap-3 text-sm py-2 pb-5 text-gray-700'>
                            <span className='flex items-center gap-2'>
                                <MapPin className='w-4 h-4' />
                                {user.location ? user.location : "Add Location"}
                            </span>

                            <span className='flex items-center gap-2'>
                                <Calendar className='w-4 h-4' />
                                Joined <span>{moment(user.createdAt).fromNow()}</span>
                            </span>
                        </div>

                        <div className='border-t border-gray-300 flex gap-5'>
                            <div className='pt-3 '>
                                <span className='sm:text-xl font-bold'>
                                    {posts.length}
                                </span>
                                <span className='text-xs sm:text-sm text-gray-600 ml-1'>Posts</span>
                            </div>

                            <div className='pt-3 '>
                                <span className='sm:text-xl font-bold'>
                                    {user.followers.length}
                                </span>
                                <span className='text-xs sm:text-sm text-gray-600 ml-1'>Followers</span>
                            </div>

                            <div className='pt-3 '>
                                <span className='sm:text-xl font-bold'>
                                    {user.following.length}
                                </span>
                                <span className='text-xs sm:text-sm text-gray-600 ml-1'>Following</span>
                            </div>


                        </div>

                    </div>



                </div>

            </div>
        </>
    )
}

export default UserProfileInfo