import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import VideoPlayer from '../../components/Watch/VideoPlayer/VideoPlayer'
import VideoInfo from '../../components/Watch/VideoInfo/VideoInfo'
import Comments from '../../components/Watch/Comments/Comments'
import SuggestedVideos from '../../components/Watch/SuggestedVideos/SuggestedVideos'
import Sidebar from '../../components/Sidebar/Sidebar'

const Watch = () => {
  const [videoId, setVideoId] = useState('')
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('v')
    if (id) {
      setVideoId(id)
    }
  }, [location])

  return (
    <div className="flex flex-col lg:flex-row bg-[#f9f9f9] min-h-screen">
      <Sidebar />
      <main className="flex-grow lg:w-3/4 p-4">
        <VideoPlayer videoId={videoId} />
        <VideoInfo videoId={videoId} />
        <Comments videoId={videoId} />
      </main>
      <aside className="lg:w-1/4 p-4">
        <SuggestedVideos videoId={videoId} />
      </aside>
    </div>
  )
}

export default Watch