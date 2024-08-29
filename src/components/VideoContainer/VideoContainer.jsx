import React, { useState, useEffect } from 'react'
import VideoCard from '../VideoCard/VideoCard'

const VideoContainer = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    // Simulating API call to fetch videos
    const fetchVideos = async () => {
      // In a real application, you would fetch data from an API
      const mockVideos = [
        { id: 1, title: 'Python for Data Science', channel: 'DataWizard', views: '2.5M', timestamp: '1 week ago', thumbnail: 'https://i.ytimg.com/vi/LHBE6Q9XlzI/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '28:45' },
        { id: 2, title: 'Machine Learning Crash Course', channel: 'AI Enthusiast', views: '1.8M', timestamp: '3 days ago', thumbnail: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '1:15:30' },
        { id: 3, title: 'Web Development in 2023', channel: 'FrontEnd Masters', views: '950K', timestamp: '5 days ago', thumbnail: 'https://i.ytimg.com/vi/VfGW0Qiy2I0/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '52:10' },
        { id: 4, title: 'Blockchain Explained', channel: 'CryptoGuru', views: '1.5M', timestamp: '2 weeks ago', thumbnail: 'https://i.ytimg.com/vi/SSo_EIwHSd4/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '37:20' },
        { id: 5, title: 'UI/UX Design Principles', channel: 'DesignPro', views: '750K', timestamp: '4 days ago', thumbnail: 'https://i.ytimg.com/vi/c9Wg6Cb_YlU/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '41:55' }
      ]
      setVideos(mockVideos)
    }

    fetchVideos()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-8 p-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default VideoContainer