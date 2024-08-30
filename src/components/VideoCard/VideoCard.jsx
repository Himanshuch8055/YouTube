import React, { useState } from 'react'

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (duration) => {
    if (!duration) return '00:00';
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '00:00';
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) {
      return Math.floor(views / 1000000) + 'M';
    } else if (views >= 1000) {
      return Math.floor(views / 1000) + 'K';
    }
    return views;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const now = new Date();
    const videoDate = new Date(timestamp);
    const diffTime = Math.abs(now - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div 
      className="flex flex-col cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3 group">
        <img 
          src={video?.thumbnail} 
          alt={video?.title} 
          className="w-full rounded-xl object-cover aspect-video"
        />
        <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
          {formatDuration(video?.duration)}
        </div>
      </div>
      <div className="flex">
        <img 
          src={video?.avatar} 
          alt={video?.channel} 
          className="w-9 h-9 rounded-full mr-3 mt-1"
        />
        <div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
            {video?.title}
          </h3>
          <p className="text-gray-600 text-xs">
            {video?.channel}
          </p>
          <div className="text-gray-600 text-xs">
            <span>{formatViews(video?.views)} views</span>
            <span className="mx-1">•</span>
            <span>{formatTimestamp(video?.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard