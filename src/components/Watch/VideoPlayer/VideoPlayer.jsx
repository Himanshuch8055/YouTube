import React, { useState, useEffect } from 'react'
import { Loader, AlertCircle } from 'lucide-react'
import { fetchVideoDetails } from '../../../utils/api'

const VideoPlayer = ({ videoId }) => {
    const [videoDetails, setVideoDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadVideoDetails = async () => {
            if (!videoId) return
            try {
                setLoading(true)
                const details = await fetchVideoDetails(videoId)
                setVideoDetails(details)
            } catch (error) {
                console.error('Error fetching video details:', error)
                setError('Failed to load video details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadVideoDetails()
    }, [videoId])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px]">
                <Loader className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px] text-red-500">
                <AlertCircle className="w-12 h-12 mb-4" />
                <p>{error}</p>
            </div>
        )
    }

    if (!videoId) {
        return (
            <div className="flex justify-center items-center h-64 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px] text-gray-600">
                No video ID provided
            </div>
        )
    }

    if (!videoDetails) {
        return (
            <div className="flex justify-center items-center h-64 sm:h-96 md:h-[450px] lg:h-[500px] xl:h-[550px] text-gray-600">
                Video details not available
            </div>
        )
    }

    return (
        <div className="w-full max-w-[2000px] mx-auto">
            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                ></iframe>
            </div>
        </div>
    )
}

export default VideoPlayer