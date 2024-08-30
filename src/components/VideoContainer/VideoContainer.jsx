import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import VideoCard from '../VideoCard/VideoCard'
import { YOUTUBE_VIDEO_API } from '../../utils/contants'

const VideoContainer = () => {
  const [videos, setVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const observerTarget = useRef(null)

  const fetchVideos = useCallback(async () => {
    if (loading) return
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${YOUTUBE_VIDEO_API}&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      if (!data || !Array.isArray(data.items)) {
        throw new Error('Invalid response format')
      }
      setVideos(prevVideos => [...prevVideos, ...data.items])
      setNextPageToken(data.nextPageToken || '')
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError(`Failed to load videos: ${error.message}. Please try again later.`)
    } finally {
      setLoading(false)
    }
  }, [nextPageToken, loading])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && nextPageToken && !loading) {
          fetchVideos()
        }
      },
      { threshold: 0.5, rootMargin: '100px' }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [nextPageToken, loading, fetchVideos])

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-8 p-4">
        {videos.map(video => (
          <Link key={video.id} to={`/watch?v=${video.id}`}>
            <VideoCard video={{
              id: video.id,
              title: video.snippet.title,
              channel: video.snippet.channelTitle,
              views: video.statistics.viewCount,
              timestamp: new Date(video.snippet.publishedAt).toLocaleDateString(),
              thumbnail: video.snippet.thumbnails.medium.url,
              avatar: `https://yt3.ggpht.com/ytc/${video.snippet.channelId}`,
              duration: video.contentDetails.duration,
              likes: video.statistics.likeCount,
              description: video.snippet.description
            }} />
          </Link>
        ))}
      </div>
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        )}
      </div>
    </div>
  )
}

export default VideoContainer