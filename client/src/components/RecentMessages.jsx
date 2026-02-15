import React, { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import moment from 'moment'
import { Link } from 'react-router-dom'

const RecentMessages = () => {
    const [messages, setMessages] = useState([])

    const fetchRecentMessages = () => {
        setMessages(dummyRecentMessagesData)
    }

    useEffect(() => {
        fetchRecentMessages()

    }, [])


    return (
        <div className='bg-white max-w-xs min-h-20 rounded-md shadow py-3 my-3 w-full p-4'>
            <h3 className='text-xs font-semibold text-slate-800 mb-5'>Recent Messages</h3>
            {
                messages.map((message, index) => (
                    <Link
                    to={`/messages/${message.from_user_id._id}`}
                        key={index}
                        className='flex py-2 p-1 justify-between cursor-pointer my-2 hover:bg-slate-100 rounded-lg '>
                        <div className='flex gap-2'>
                            <img src={message.from_user_id.profile_picture} className='w-10 h-10 rounded-full' />

                            <div>
                                <h4 className='font-semibold text-sm text-slte-700'>{message.from_user_id.full_name}</h4>
                                <p className='text-slate-500 text-sm'>{message.text ? message.text : "Media"}</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-end'>
                            <p className='text-xs text-slate-500'>{moment(message.createdAt).fromNow()}</p>
                            {!message.seen && <div className='bg-indigo-500 text-white text-[10px] rounded-full w-4 h-4 flex justify-center items-center mt-1'>1</div>}
                        </div>


                    </Link>
                ))
            }

        </div>
    )
}

export default RecentMessages