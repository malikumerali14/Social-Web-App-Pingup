import React, { useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react';

const Chatbox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("")
  const [image, setImage] = useState()
  const [user, setuser] = useState(dummyUserData)

  const messageRef = useRef()

  const sendMessage = async () => {

  }




  return (
    <div className='h-screen flex flex-col'>
      <div className='flex gap-2 p-2 md:px-10 xl:pl-40 '>
        <img src={user.profile_picture} className='size-8 rounded-full' />
        <div>
          <p className='font-semibold'>{user.full_name}</p>
          <p className='text-gray-500 -mt-1.5'>@{user.username}</p>
        </div>
      </div>

      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='max-w-4xl mx-auto space-y-4 '>
          {
            messages.toSorted((a, b) => a.createdAt - b.createdAt).map((message, index) => (
              <div key={index} className={`flex flex-col ${message.to_user_id !== user._id ? "items-start" : "items-end"} `}>
                <div className={`text-sm p-2 max-w-sm text-slate-700 shadow-md bg-white rounded-lg ${message.to_user_id !== user._id ? "rounded-bl-none" : "rounded-br-none"}`}>
                  {
                    message.message_type == "image" && <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' alt='' />
                  }
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          }
          <div ref={messageRef} />
        </div>
      </div>

      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 max-w-xl mx-auto border border-gray-200 shadow-md rounded-full p-2 mb-5 w-full'>
          <input type='text' className='outline-none text-slate-500 flex-1' placeholder='Type a message...'
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)} value={text}
          />

          <label htmlFor='image'>
            {
              image ? <img src={URL.createObjectURL(image)} className='h-8 rounded' />
                : <ImageIcon className='size-7 text-gray-400 cursor-pointer' />
            }
            <input type='file' id='image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>

            <button className='bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white p-1.5 cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-colors duration-100'>
              <SendHorizonal size={18} />
            </button>
        </div>

      </div>

    </div>
  )
}

export default Chatbox