import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import { SignInWithMetamaskButton } from '@clerk/clerk-react'
import StoryModal from './StoryModal'
import StoryViewer from './StoryViewer'

const StoriesBar = () => {
    const [stories, setStories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [viewStory, setViewStory] = useState(null)

    const fetchStories = () => {
        setStories(dummyStoriesData)
    }

    useEffect(() => {
        fetchStories()

    }, [])

    return (
        <div className='py-4 my-4 w-screen sm:w-[calc(100vw - 240px)] lg:max-w-2xl overflow-x-auto no-scrollbar px-4'>
            <div className='flex gap-3'>
                {/* Create item  */}
                <div onClick={() => setShowModal(true)} className='flex justify-center items-center flex-col min-w-30 max-w-30 cursor-pointer border-2 border-dashed border-gray-400 rounded-md px-4 py-2 max-h-40 
                aspect-[3/4] bg-gradient-to-b from-indigo-200 to-white hover:from-indigo-300 hover:to-gray-100 duration-200 transition-colors'>
                    <Plus className='bg-blue-500 rounded-full w-7 h-7 text-white p-1.5' />
                    <p className='text-sm'>Create item</p>
                </div>

                {/* Other Stories  */}
                {
                    stories.map((story, index) => (
                        <div
                            onClick={() => setViewStory(story)}
                            key={index}
                            className='relative cursor-pointer bg-gradient-to-b from-purple-700 to-indigo-600 overflow-hidden hover:from-purple-800 hover:to-indigo-700 transition-colors  rounded-md min-w-30 max-w-30 max-h-40 aspect-[3/4]'>
                            <div>
                                <img src={story.user.profile_picture} className='h-8 rounded-full absolute top-4 z-10 left-3' />
                            </div>
                            <p className='truncate absolute top-16 left-2 text-white text-sm'>
                                {story.content}
                            </p>
                            <p className='absolute bottom-1 right-0 text-xs z-10 text-white'>{moment(story.createdAt).fromNow()}</p>

                            {
                                story.media_type != "text" && (
                                    <div className='absolute inset-0 rounded-lg'>
                                        {
                                            story.media_type == 'image' ?
                                                <img src={story.media_url} className='h-full w-full object-cover hover::scale-150 opacity-90 hover:opacity-100 z-20' />
                                                :
                                                <video src={story.media_url} className='h-full w-full object-cover hover::scale-150 opacity-90 hover:opacity-100 z-20' />
                                        }
                                    </div>
                                )
                            }

                        </div>

                    ))
                }
            </div>

            {/* Add Story Modal  */}
            {
                showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />
            }
            {/* View Story Modal  */}
            {
                viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
            }

        </div>
    )
}

export default StoriesBar