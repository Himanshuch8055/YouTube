import React from 'react'

const VideoCard = ({ video }) => {
  return (
    <div className="flex flex-col cursor-pointer w-full">
      <div className="relative mb-2">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full rounded-xl object-cover aspect-video"
        />
        <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded font-semibold">
          {video.duration}
        </div>
      </div>
      <div className="flex">
        <img 
          src={video.avatar} 
          alt={video.channel} 
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full mr-2 sm:mr-3 flex-shrink-0"
        />
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-600 text-xs truncate">
            {video.channel}
          </p>
          <p className="text-gray-600 text-xs truncate">
            {video.views} views • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard