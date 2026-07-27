import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios.js'

const StoryModal = ({ setShowModal, fetchStories }) => {
    const bgColors = ['#4e50ea', 'brown', '#7e4bf2', 'purple', 'black', 'orange']

    const [mode, setMode] = useState('text')
    const [backgroundColor, setBackgroundColor] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const { getToken } = useAuth();

    const MAX_VIDEO_DURATION = 60; // seconds
    const MAX_VIDEO_SIZE_MB = 50; // MB

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.type.startsWith("video")) {
                if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
                    toast.error(`Video file size cannot exceed ${MAX_VIDEO_SIZE_MB} MB.`)
                    setMedia(null)
                    setPreviewUrl(null)
                    return;
                }

                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src)
                    if (video.duration > MAX_VIDEO_DURATION) {
                        toast.error("Video duration cannot exceed 1 minute.")
                        setMedia(null)
                        setPreviewUrl(null)
                    } else {
                        setMedia(file)
                        setPreviewUrl(URL.createObjectURL(file))
                        setText('')
                        setMode('media');
                    }
                }

                video.src = URL.createObjectURL(file);


            } else if (file.type.startsWith("image")) {
                setMedia(file)
                setPreviewUrl(URL.createObjectURL(file))
                setText('')
                setMode('media');
            }
        }
    }

    const handleCreateStory = async () => {
        const media_type = mode === 'media' ? media?.type.startsWith('image') ? 'image' : 'video' : 'text';

        if (media_type == 'text' && !text) {
            throw new Error("Please enter some text");
        }

        let formData = new FormData();
        formData.append('content', text);
        formData.append('media_type', media_type);
        formData.append('media', media);
        formData.append('background_color', backgroundColor);

        const token = await getToken();

        try {
            const { data } = await api.post('/api/story/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setShowModal(false);
                toast.success("Story created successfully");
                fetchStories();

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

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
                        <input onChange={(e) => { handleMediaUpload }}
                            type='file' accept='image/*, video/*' className='hidden' />
                        <Upload size={18} /> Photo/Video
                    </label>

                </div>
                <button
                    onClick={() => toast.promise(handleCreateStory(), {
                        loading: "Saving..."
                    })}
                    className='flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 p-2 mt-4 rounded-md cursor-pointer'>
                    <Sparkle />Create Story
                </button>

            </div>
        </div>
    )
}

export default StoryModal