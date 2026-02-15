import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {
    const { profileId } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [activeTab, setActiveTab] = useState('posts')
    const [showEdit, setShowEdit] = useState(false)

    const fetchUser = async () => {
        setUser(dummyUserData)
        setPosts(dummyPostsData)
    }

    useEffect(() => {
        fetchUser()

    }, [])


    return user ? (
        <>
            <div className='relative h-full overflow-y-scroll'>
                <div className='max-w-3xl mx-auto'>
                    {/* Profile Card  */}
                    <div className='bg-white rounded-2xl shadow overflow-hidden'>
                        {/* Cover Photo  */}
                        <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
                            {user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover' />}
                        </div>

                        {/* User Info  */}
                        <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
                    </div>

                    {/* Tabs  */}
                    <div className='mt-6'>
                        <div className='bg-white p-1 shadow-md flex max-w-md mx-auto rounded-lg transition-all'>
                            {["posts", "media", "likes"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 px-5 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-md ${activeTab == tab ? "bg-indigo-500 text-white" : ""}`}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Posts  */}
                    {activeTab == 'posts' && (
                        <div className='mt-6 flex flex-col items-center gap-6'>
                            {posts.map((post) => <PostCard key={post._id} post={post} />)}
                        </div>
                    )}

                    {/* // Media  */}
                    {activeTab == "media" && (
                        <div className='flex flex-wrap mt-6 max-w-6xl'>
                            {posts.filter((post) => post.image_urls.length > 0).map((post) => (
                                <>
                                    {post.image_urls.map((image, index) => (
                                        <Link
                                            to={image}
                                            target="_blank"
                                            key={index}
                                            className='relative group'
                                        >
                                            <img src={image} key={index} className='w-64 object-cover aspect-video' />
                                            <p className='absolute bottom-0 backdrop-blur-xl text-white text-xs p-1 px-3 right-0 opacity-0 group-hover:opacity-100'>Posted {moment(post.createdAt).fromNow()}</p>
                                        </Link>
                                    ))}
                                </>
                            ))}
                        </div>
                    )}

                </div>
                {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
            </div>
        </>
    ) : (<Loading />)
}

export default Profile