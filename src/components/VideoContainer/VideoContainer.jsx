import React, { useState, useEffect } from 'react'
import VideoCard from '../VideoCard/VideoCard'

const VideoContainer = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    // Simulating API call to fetch videos
    const fetchVideos = async () => {
      // In a real application, you would fetch data from an API
      const mockVideos = [
        { id: 1, title: 'Python for Data Science', channel: 'DataWizard', views: '2.5M', timestamp: '1 week ago', thumbnail: 'https://i.ytimg.com/vi/LHBE6Q9XlzI/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '28:45', likes: '125K', dislikes: '2K', description: 'Learn Python for Data Science in this comprehensive tutorial.' },
        { id: 2, title: 'Machine Learning Crash Course', channel: 'AI Enthusiast', views: '1.8M', timestamp: '3 days ago', thumbnail: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '1:15:30', likes: '95K', dislikes: '1.5K', description: 'Get started with Machine Learning in this crash course for beginners.' },
        { id: 3, title: 'Web Development in 2023', channel: 'FrontEnd Masters', views: '950K', timestamp: '5 days ago', thumbnail: 'https://i.ytimg.com/vi/VfGW0Qiy2I0/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '52:10', likes: '78K', dislikes: '800', description: 'Discover the latest trends and technologies in web development for 2023.' },
        { id: 4, title: 'Blockchain Explained', channel: 'CryptoGuru', views: '1.5M', timestamp: '2 weeks ago', thumbnail: 'https://i.ytimg.com/vi/SSo_EIwHSd4/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '37:20', likes: '110K', dislikes: '3K', description: 'Understand the fundamentals of blockchain technology and its applications.' },
        { id: 5, title: 'UI/UX Design Principles', channel: 'DesignPro', views: '750K', timestamp: '4 days ago', thumbnail: 'https://i.ytimg.com/vi/c9Wg6Cb_YlU/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '41:55', likes: '62K', dislikes: '500', description: 'Learn essential UI/UX design principles to create better user experiences.' },
        { id: 6, title: 'JavaScript ES6+ Features', channel: 'CodeMaster', views: '1.2M', timestamp: '1 day ago', thumbnail: 'https://i.ytimg.com/vi/NCwa_xi0Uuc/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '45:30', likes: '88K', dislikes: '1K', description: 'Explore the powerful features of modern JavaScript (ES6+).' },
        { id: 7, title: 'Docker for Beginners', channel: 'DevOps Guru', views: '800K', timestamp: '6 days ago', thumbnail: 'https://i.ytimg.com/vi/fqMOX6JJhGo/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '1:02:15', likes: '70K', dislikes: '900', description: 'Get started with Docker containerization in this beginner-friendly tutorial.' },
        { id: 8, title: 'React Hooks Deep Dive', channel: 'ReactMaster', views: '1.1M', timestamp: '2 days ago', thumbnail: 'https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg', avatar: 'https://via.placeholder.com/88', duration: '56:40', likes: '92K', dislikes: '1.2K', description: 'Master React Hooks with this in-depth tutorial on functional components.' }
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