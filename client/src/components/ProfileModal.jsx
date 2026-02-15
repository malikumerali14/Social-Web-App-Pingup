import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react';

const ProfileModal = ({ setShowEdit }) => {

    const user = dummyUserData;
    const [editForm, setEditForm] = useState({
        user_name: user.username,
        bio: user.bio,
        location: user.location,
        profile_picture: null,
        cover_photo: null,
        full_name: user.full_name
    })

    const handleSaveProfile = async (e) => {
        e.preventDefault()

    }


    return (
        <div className='p-1 bg-black/50 h-screen fixed inset-0 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <div className='max-w-2xl flex justify-center w-full sm:py-6 mx-auto'>
                <div className='bg-white rounded-lg shadow p-6 min-w-2xl'>
                    <h1>Edit Profile</h1>

                    <form
                        className='space-y-6 text-slate-800'
                        onSubmit={handleSaveProfile}>
                        <div className='flex flex-col items-start gap-3'>
                            <label className='block text-sm font-medium' htmlFor='profile_picture'>
                                Profile Picture
                                <input type='file' accept='image/*' hidden id='profile_picture' className='w-full p-3 border '
                                    onChange={(e) => { setEditForm({ ...editForm, profile_picture: e.target.files[0] }) }}
                                />
                                <div className='relative group cursor-pointer'>
                                    <img
                                        className='w-24 h-24 rounded-full object-cover mt-2'
                                        src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture) : user.profile_picture} />
                                    <div className='absolute hidden group-hover:flex inset-0 items-center justify-center rounded-full bg-black/40 text-white'>
                                        <Pencil size={24} />
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Cover Photo  */}
                        <div className=''>
                            <label htmlFor='cover_photo'>
                                Cover Photo
                                <input type='file' id='cover_photo' accept='image/*' hidden
                                    onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })}
                                />
                                <div className='relative group cursor-pointer'>
                                    <img
                                        className=' h-40 w-[50%] rounded-md  object-cover mt-2'
                                        src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo}
                                    />

                                    <div className='absolute hidden group-hover:flex inset-0 w-[50%] items-center justify-center bg-black/40 rounded-md text-white'>
                                        <Pencil size={24} />
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div>
                            <label>
                                Name
                            </label>
                            <input
                                type='text'
                                placeholder='Please enter your name'
                                className='w-full border border-gray-300 rounded-md p-2'
                                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                value={editForm.full_name}
                            />
                        </div>

                        <div>
                            <label>
                                User Name
                            </label>
                            <input
                                type='text'
                                placeholder='Please enter your username'
                                className='w-full border border-gray-300 rounded-md p-2'
                                onChange={(e) => setEditForm({ ...editForm, user_name: e.target.value })}
                                value={editForm.user_name}
                            />
                        </div>

                        <div>
                            <label>
                                Bio
                            </label>
                            <textarea
                                rows={3}
                                type='text'
                                placeholder='Please enter your bio'
                                className='w-full border border-gray-300 rounded-md p-2'
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                value={editForm.bio}
                            />
                        </div>

                        <div>
                            <label>
                                Location
                            </label>
                            <textarea
                                rows={3}
                                type='text'
                                placeholder='Please enter your location'
                                className='w-full border border-gray-300 rounded-md p-2'
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                value={editForm.location}
                            />
                        </div>

                        {/* Buttons  */}
                        <div className='flex gap-2 justify-end w-full'>
                            <button
                                onClick={() => setShowEdit(false)}
                                className='bg-gray-100 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 border border-gray-300 transition-all duration-150'>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='bg-gradient-to-r to-purple-600 from-indigo-500 px-4 py-2 rounded-md text-white border border-gray-300 cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all duration-150'>
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default ProfileModal