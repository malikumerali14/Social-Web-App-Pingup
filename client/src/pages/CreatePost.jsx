import React, { useEffect, useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Image, X } from 'lucide-react'
import { toast } from 'react-hot-toast'


const CreatePost = () => {
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)


    const user = dummyUserData;

    const handleSubmit = async() => {
        
        
    }


    return (
        <>
            <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white '>
                <div className='max-w-6xl mx-auto p-6'>
                    <div>
                        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
                        <p className='text-slate-600'>Share your thoughts with the world</p>
                    </div>

                    <div className='max-w-xl bg-white p-4 sm:p-8 my-6 rounded-xl space-y-4 shadow'>
                        <div className='flex items-center'>
                            <img src={user.profile_picture} className='w-12 h-12 rounded-full shadow' />
                            <div>
                                <h2 className='font-semibold'>{user.full_name}</h2>
                                <p className='text-sm text-gray-500'>@{user.username}</p>
                            </div>
                        </div>

                        {/* Text-Area  */}
                        <div className=''>
                            <textarea
                                className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
                                placeholder="Whats happening?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* Images  */}
                        {images.length > 0 && <div className='flex gap-3 flex-wrap mt-3'>
                            {
                                images.map((image, i) => (
                                    <div key={i} className='relative group cursor-pointer'>
                                        <img src={URL.createObjectURL(image)} className='h-20 rounded-md' />
                                        <div
                                            onClick={() => setImages(images.filter((_, index) => index !== i))}
                                            className='absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-md cursor-pointer'>
                                            <X className='w-6 h-6 text-white' />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        }

                        {/* Bottom Bar  */}
                        <div className='border-t flex items-center justify-between pt-3 border-gray-300'>
                            <label htmlFor='images' className='text-gray-500 hover:text-gray-700 cursor-pointer '>
                                <Image className='size-6' />
                            </label>

                            <input type='file' id='images' accept='image/*' hidden multiple onChange={(e) => setImages([...images, ...e.target.files])} />

                            <button
                                onClick={() => toast.promise(
                                    handleSubmit(),
                                    {
                                        loading: "uploading...",
                                        success: <p>Post Added</p>,
                                        error: <p>Post Not Added</p>
                                    }
                                )}
                                disabled={loading}
                                className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-indigo-600 hover:to-purple-700 cursor-pointer transition-all duration-100'>
                                Publish Post
                            </button>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default CreatePost