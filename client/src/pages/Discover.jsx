import { Search } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import Loading from '../components/Loading'
import api from '../api/axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'

const Discover = () => {
    const [input, setInput] = useState()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const { getToken } = useAuth();


    const handleSearch = async (e) => {
        if (e.key == 'Enter') {
            try {
                setUsers([])
                setLoading(true)

                const { data } = await api.post('/api/user/discover', { input }, {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`
                    }
                })

                data.success ? setUsers(data.users) : toast.error(data.message);
                setLoading(false);
                setInput('');

            } catch (error) {
                toast.error(error.message)
            }
            setLoading(false);
        }
    }


    useEffect(() => {
        getToken().then((token) => {
            dispatch(fetchUser(token));
        })


    }, [getToken])


    return (
        <>
            <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
                <div className='max-w-6xl mx-auto py-7'>
                    <div>
                        <h1 className='font-bold text-3xl'>Discover People</h1>
                        <p className='my-1 text-gray-600'>Connect with amazing people and grow your network</p>
                    </div>

                    <div className='bg-white px-4 py-5 rounded-lg shadow-lg w-[95%] mt-7 '>
                        <div className='flex items-center gap-2 border border-gray-400 px-3 py-2 my-1 rounded-md'>
                            <Search className='text-gray-400 w-5 h-5' />
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyUp={handleSearch}
                                placeholder='Search people by name, username, bio or location...'
                                className='w-full outline-none' />
                        </div>
                    </div>

                    <div className='flex gap-3'>
                        {users && users.map((user) => (
                            <ProfileCard user={user} key={user._id} />

                        ))}
                    </div>

                    {
                        loading && <Loading height='60vh' />
                    }

                </div>
            </div>
        </>
    )
}

export default Discover