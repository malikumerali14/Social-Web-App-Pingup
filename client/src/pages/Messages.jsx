import React from 'react'
import { useState, useEffect } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const [messages, setMessages] = useState([])
  
  const navigate = useNavigate()

  const fetchRecentMessages = () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchRecentMessages()

  }, [messages])


  return (
    <div className='px-6 py-3 my-4 '>
      <div className='max-w-6xl mx-auto'>
        <h1 className='font-bold text-3xl'>Messages</h1>
        <p>Talk to your friends and family</p>

        <div>
          {
            messages.map((message) => (
              <div
                key={message.from_user_id._id}
                className='flex justify-between mt-5 bg-white max-w-2xl shadow rounded-md px-4 py-6'>
                <div className='flex gap-2'>
                  <img
                    className='w-14 h-14 rounded-full '
                    src={message.from_user_id.profile_picture} />

                  <div>
                    <h3 className=''>{message.from_user_id.full_name}</h3>
                    <p className='text-slate-500'>@{message.from_user_id.username}</p>
                    <p className='text-slate-500'>{message.from_user_id.bio}</p>
                  </div>
                </div>

                <div className='text-slate-800 flex flex-col gap-2 mt-3'>
                  <button
                    onClick={() => navigate(`/messages/${message.from_user_id._id}`)}
                    className='size-10 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all duration-200 rounded-md flex items-center justify-center gap-2 active:scale-95'>
                    <MessageSquare className='w-4 h-4' />
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${message.from_user_id._id}`)}
                    className='size-10 bg-slate-100 cursor-pointer hover:bg-slate-200 transition-all duration-200 rounded-md flex items-center justify-center gap-2 active:scale-95'>
                    <Eye className='w-4 h-4' />
                  </button>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Messages