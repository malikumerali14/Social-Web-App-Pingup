import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, UserCheck, UserPlus, UserRoundPen, Users } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import { fetchConnections } from '../features/connections/connectionsSlice'
import { useEffect } from 'react'
// import {
//     dummyFollowersData as followers,
//     dummyConnectionsData as connections,
//     dummyFollowingData as following,
//     dummyPendingConnectionsData as pendingConnections
// } from '../assets/assets'

const Connections = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState("Followers")

    const { getToken } = useAuth();

    const { followers, following, connections, pendingConnections } = useSelector((state) => state.connections);
    const dataArray = [
        { label: "Followers", value: followers, icon: Users },
        { label: "Following", value: following, icon: UserCheck },
        { label: "Pending", value: pendingConnections, icon: UserRoundPen },
        { label: "Connections", value: connections, icon: UserPlus }
    ]


    const handleUnfollow = async (userId) => {
        try {
            const { data } = await api.post('/api/user/unfollow', { id: userId }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                toast.success(data.message);
                dispatch(fetchConnections(await getToken()))

            } else {
                toast(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }


    const acceptConnection = async (userId) => {
        try {
            const { data } = await api.post('/api/user/accept', { id: userId }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                toast.success(data.message);
                dispatch(fetchConnections(await getToken()))

            } else {
                toast(data.message)
            }


        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getToken().then((token) => dispatch(fetchConnections(token)));


    }, [getToken])



    return (
        <>
            <div className='max-w-6xl mx-auto py-7'>
                <div>
                    <h1 className='font-bold text-3xl'>Connections</h1>
                    <p className='my-1'>Manage your connections and discover new network</p>
                </div>

                <div className='flex mb-8 gap-6 my-4'>
                    {dataArray.map((item, index) => (
                        <div key={index}>
                            <div className='border border-gray-200 p-4 shadow-md bg-white w-36 flex flex-col items-center justify-center'>
                                <b>{item.value.length}</b>
                                <p>{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs  */}
                <div className='inline-flex items-center bg-white border border-gray-200 p-1 shadow-sm rounded-md gap-3'>
                    {dataArray.map((tab, index) => (
                        <div
                            onClick={() => setCurrentTab(tab.label)}
                            key={index}
                            className={`flex items-center mx-2 cursor-pointer hover:text-black ${currentTab === tab.label ? "text-black bg-white" : "text-gray-500 "}`}>
                            <tab.icon className='w-4 h-4' />
                            <span className='ml-1'>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className='ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full'>{tab.count}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Connections  */}
                <div className='flex gap-5 mt-5'>
                    {dataArray.find((item) => item.label === currentTab).value.map((user, index) => (
                        <div key={index} className='border border-gray-200 flex gap-5 bg-white p-6 rounded-md max-w-120 '>
                            <img src={user.profile_picture} className='w-12 h-12 rounded-full' />
                            <div>
                                <h1>{user.full_name}</h1>
                                <p className='text-gray-500'>@{user.username}</p>
                                <p>{user.bio.slice(0, 30)}...</p>

                                <div className='flex gap-2 mt-4'>
                                    <button
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        className='px-7 py-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-sm hover:from-indigo-700 hover:to-purple-700 cursor-pointer text-white text-nowrap'>
                                        View Profile
                                    </button>
                                    {
                                        currentTab === "Following" && <button
                                            onClick={() => handleUnfollow(user._id)}
                                            className='bg-gray-100 text-gray-800 px-7 py-2 w-full rounded-sm hover:bg-gray-300 cursor-pointer transition-all duration-100'>
                                            Unfollow
                                        </button>
                                    }
                                    {
                                        currentTab === "Pending" && <button
                                            onClick={() => acceptConnection(user._id)}
                                            className='bg-gray-100 text-gray-800 px-7 py-2 w-full rounded-sm hover:bg-gray-300 cursor-pointer transition-all duration-100'>
                                            Accept
                                        </button>
                                    }
                                    {
                                        currentTab === "Connections" && <button
                                            onClick={() => navigate(`/messages/${user._id}`)}
                                            className='flex gap-1 items-center bg-gray-100 text-gray-800 px-4 py-2 w-full rounded-sm hover:bg-gray-300 cursor-pointer transition-all duration-100'>
                                            <MessageCircle className='w-4 h-4' />
                                            Message
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Connections