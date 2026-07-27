import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import { assets } from '../assets/assets'
import RecentMessages from '../components/RecentMessages'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Feed = () => {
  const [feed, SetFeed] = useState([])
  const [loading, setLoading] = useState(true)

  const { getToken } = useAuth();

  const fetchFeedData = async () => {
    const token = await getToken();

    try {
      setLoading(true)
      const { data } = await api.get('/api/post/feed', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        SetFeed(data.posts);

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false);

  }

  useEffect(() => {
    fetchFeedData()

  }, [])


  return !loading ? (
    <div className='flex h-full overflow-y-scroll items-start justify-center gap-18 space-y-1'>
      {/* Left Side  */}
      <div>
        <div>
          <StoriesBar />
        </div>

        <div className='p-2 space-y-6'>
          {feed.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>


      {/* Right Side  */}
      <div className='max-xl:hidden sticky top-0 mt-7'>
        <div className='bg-white rounded-md p-4 text-xs space-y-2 max-w-xs shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} className='w-75 h-50 rounded-md' />
          <p className='text-slate-600'>Email marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
        </div>

        <RecentMessages />
      </div>



    </div>



  ) : <Loading />
}

export default Feed