import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

const StoryModal = ({ setShowModal, fetchStories }) => {
    const bgColors = ['#4e50ea', 'brown', '#7e4bf2', 'purple', 'black', 'orange']

    const [mode, setMode] = useState('text')
    const [backgroundColor, setBackgroundColor] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleCreateStory = async () => {

    }


    return (
        <div className='fixed inset-0 z-130 min-h-screen backdrop-blur text-white bg-black/80 p-6 flex items-center justify-center'>
            <div className='max-w-md w-full'>
                <div className='w-full h-full flex justify-between items-center'>
                    <button>
                        <ArrowLeft onClick={() => setShowModal(false)} className='cursor-pointer' />
                    </button>
                    <h1 className='text-white font-bold text-lg'>Create Story</h1>
                    <span></span>
                </div>

                <div className='h-96 rounded-lg mt-5 p-1' style={{ backgroundColor: backgroundColor }}>

                    {mode == "text" && (
                        <textarea className='bg-transparent outline-none h-full w-full p-6 text-white text-lg resize-none' value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind" />
                    )}

                    {
                        mode === "media" && previewUrl && (
                            media?.type.startsWith("image") ? (
                                <img src={previewUrl} className="max-h-full object-contain" />
                            ) : (
                                <video src={previewUrl} className="max-h-full object-contain" />
                            )
                        )
                    }

                </div>

                <div className='flex mt-4 gap-2'>
                    {
                        bgColors.map((color) => (
                            <button className='w-6 h-6 rounded-full cursor-pointer ' onClick={() => setBackgroundColor(color)} key={color} style={{ backgroundColor: color }} />
                        ))
                    }
                </div>

                <div className='mt-4 flex gap-2 justify-center items-center'>
                    <button onClick={() => setMode('text')} className={`flex flex-1 cursor-pointer items-center gap-2 justify-center rounded-md p-2 ${mode == "text" ? "bg-white text-black" : "bg-zinc-800"} `}>
                        <TextIcon size={18} />Text
                    </button>
                    <label className={`flex flex-1 rounded-md items-center justify-center cursor-pointer gap-2 p-2 ${mode == 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                        <input onChange={(e) => { handleMediaUpload(e); setMode('media') }}
                            type='file' accept='image/*, video/*' className='hidden' />
                        <Upload size={18} /> Photo/Video
                    </label>

                </div>
                <button
                    onClick={() => toast.promise(handleCreateStory(), {
                        loading: "Saving...",
                        success: <p>Story Added</p>,
                        error: e => <p>{e.message}</p>
                    })}
                    className='flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 p-2 mt-4 rounded-md cursor-pointer'>
                    <Sparkle />Create Story
                </button>

            </div>
        </div>
    )
}

export default StoryModal