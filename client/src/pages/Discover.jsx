import { Search } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { dummyConnectionsData } from '../assets/assets'
import Loading from '../components/Loading'

const Discover = () => {
    const [input, setInput] = useState()
    const [users, setUsers] = useState(dummyConnectionsData)
    const [loading, setLoading] = useState(false)

    const handleSearch = (e) => { 
        if(e.key == 'Enter'){
            setUsers([])
            setLoading(true)
            setTimeout(() => {
                setUsers(dummyConnectionsData)
                setLoading(false)

            }, 1000);
        }
    }

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