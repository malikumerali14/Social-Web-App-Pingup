import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import React, { useState } from 'react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const PostCard = ({ post }) => {

    const postWithHashtags = post.content.replace(/(#\w+)/g, "<span class='text-indigo-600'>$1</span>")
    const [likes, setLikes] = useState(post.likes_count)
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate();

    const { getToken } = useAuth();

    const handleLike = async () => {
        try {
            const { data } = await api.post('/api/post/like', { postId: post._id }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                toast.success(data.message);
                setLikes(prev => {
                    const currentLikes = Array.isArray(prev) ? prev : [];
                    if (currentLikes?.includes(currentUser._id)) {
                        return currentLikes.filter(id => id !== currentUser._id)
                    } else {
                        return [...currentLikes, currentUser._id]
                    }
                })

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className='bg-white rounded-xl p-5 shadow space-y-4 w-full max-w-2xl'>
            {/* User Info  */}
            <div
                onClick={() => navigate('/profile/' + post.user._id)}
                className='flex items-center space-x-1 gap-1 cursor-pointer'>
                <img src={post.user.profile_picture} className='w-10 h-10 rounded-full shadow' />
                <div>
                    <div className='flex items-center gap-1'>
                        <span>{post.user.full_name}</span>
                        <BadgeCheck className='w-4 h-4 text-blue-500' />
                    </div>
                    <div className='text-gray-500 text-sm'>
                        @{post.user.username} . {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* Post Content  */}
            {post.content && <div className='text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{ __html: postWithHashtags }} />}

            {/* Images  */}
            <div className='grid grid-cols-2 gap-2'>
                {post.image_urls.map((image, index) => (
                    <img src={image} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length == 1 && 'col-span-2 h-auto'}`} />
                ))}
            </div>
            <hr className='text-gray-300' />

            {/* Like, Comment, Share  */}
            <div className='flex items-center text-gray-600 gap-4 text-sm'>
                <div className='flex items-center gap-1'>
                    <Heart
                        onClick={handleLike}
                        className={`w-4 h-4 cursor-pointer ${likes?.includes?.(currentUser._id) && "text-red-500 fill-red-500"}`} />
                    <span>{likes?.length}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4 cursor-pointer' />
                    <span>{12}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Share2 className='w-4 h-4 cursor-pointer' />
                    <span>{17}</span>
                </div>
            </div>

        </div>
    )
}

export default PostCard