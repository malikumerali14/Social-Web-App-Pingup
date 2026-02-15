import { ArrowLeft, BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const StoryViewer = ({ viewStory, setViewStory }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let timer, progressInterval;    

        if (viewStory && viewStory.media_type != "video") {
            const duration = 10000
            const setTime = 100
            let elapsed = 0

            progressInterval = setInterval(() => {
                elapsed += setTime
                setProgress((elapsed / duration) * 100)
                
            }, setTime);

            timer = setTimeout(() => {
                setViewStory(null)
            }, duration);

        }

        return () => {
            clearTimeout(timer)
            clearInterval(progressInterval)
        }


    }, [viewStory, setViewStory])




    const handleClose = () => {
        setViewStory(null)
    }

    const renderContent = () => {
        switch (viewStory.media_type) {
            case "image":
                return (
                    <img src={viewStory.media_url} className='max-w-full max-h-screen object-contain' />
                )
                break;

            case "video":
                return (
                    <video
                        controls autoPlay
                        onEnded={() => setViewStory(null)} src={viewStory.media_url} className='max-w-full max-h-screen object-contain' />
                )
                break;

            case "text":
                return (
                    <div className='w-full h-full flex items-center justify-center p-6 text-white text-2xl'>
                        {viewStory.content}
                    </div>
                )
                break;

            default:
                break;
        }
    }

    return (
        <div className='fixed z-130 inset-0 h-screen w-screen p-4 text-white' style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : "#000000" }}>
            {/* Progress Bar  */}
            <div className='w-full h-1 absolute top-0 left-0 bg-gray-700'>
                <div className='h-full bg-white transition-all duration-100 linear' style={{ width: `${progress}%` }}></div>
            </div>

            {/* Profile Info - Top left  */}
            <div className='absolute top-4 left-4 flex items-center justify-center gap-3 bg-black/50 backdrop-blur-2xl px-6 py-2.5 rounded-md'>
                <img src={viewStory.user.profile_picture} className='rounded-full h-8 w-8 ' />
                <div className='flex items-center justify-center gap-1'>
                    <span>{viewStory.user.full_name}</span>
                    <BadgeCheck size={17} />
                </div>
            </div>

            {/* Close Button  */}
            <button
                onClick={handleClose}
                className='absolute top-4 right-4 '>
                <X className='hover:scale-110 cursor-pointer w-8 h-8 transition-all duration-200' />
            </button>

            {/* Story Content  */}
            <div className='max-w-[90vw] mx-auto h-[90vh] max-h-[90vh] flex items-center justify-center'>
                {renderContent()}
            </div>

        </div>
    )
}

export default StoryViewer