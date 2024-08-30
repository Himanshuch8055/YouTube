import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { YOUTUBE_VIDEO_API } from '../../../utils/contants'
import VideoCard from '../../VideoCard/VideoCard'
import { formatViews, formatTimestamp, formatDuration } from '../../../utils/formatters'

const SuggestedVideos = ({ initialMaxVideos = 15 }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageToken, setPageToken] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

  const fetchSuggestedVideos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`${YOUTUBE_VIDEO_API}&maxResults=${initialMaxVideos}&pageToken=${pageToken}`)
      if (!response.ok) {
        throw new Error('Failed to fetch suggested videos')
      }
      const data = await response.json()
      setVideos(prevVideos => [...prevVideos, ...data.items])
      setPageToken(data.nextPageToken || '')
      setHasMore(!!data.nextPageToken)
    } catch (error) {
      console.error('Error fetching suggested videos:', error)
      setError('Failed to load suggested videos. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [pageToken, initialMaxVideos])

  useEffect(() => {
    fetchSuggestedVideos()
  }, [fetchSuggestedVideos])

  const lastVideoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchSuggestedVideos()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, fetchSuggestedVideos])

  const renderSkeletonLoader = useMemo(() => (
    <div className="flex flex-col space-y-4 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-2">
          <div className="w-40 h-24 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  ), [])

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-red-100 rounded-md">{error}</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      {videos.map((video, index) => (
        <SuggestedVideoItem 
          key={video.id} 
          video={video} 
          ref={index === videos.length - 1 ? lastVideoElementRef : null}
        />
      ))}
      {loading && renderSkeletonLoader}
    </div>
  )
}

const SuggestedVideoItem = React.forwardRef(({ video }, ref) => (
  <Link to={`/watch?v=${video.id}`} className="block group" ref={ref}>
    <div className="flex space-x-2">
      <div className="w-40 flex-shrink-0">
        <div className="relative">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-24 object-cover rounded-md"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.contentDetails?.duration ? formatDuration(video.contentDetails.duration) : ''}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {video.snippet.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 hover:text-gray-700 transition-colors duration-200">
          {video.snippet.channelTitle}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>{formatViews(video.statistics?.viewCount)} views</span>
          <span className="mx-1">•</span>
          <span>{formatTimestamp(video.snippet.publishedAt)}</span>
        </div>
      </div>
    </div>
  </Link>
))

export default SuggestedVideos