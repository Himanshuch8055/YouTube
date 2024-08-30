import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react';
import { formatNumber, formatDate } from '../../../utils/formatters';
import { fetchVideoDetails } from '../../../utils/api';

const VideoInfo = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const details = await fetchVideoDetails(videoId);
        setVideoDetails(details);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    if (videoId) {
      getVideoDetails();
    }
  }, [videoId]);

  if (!videoDetails) return <div className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>;

  const {
    title,
    channelTitle,
    publishedAt,
    viewCount,
    likeCount,
    description,
    subscriberCount,
  } = videoDetails;

  return (
    <div className="mt-4 max-w-full">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 line-clamp-2">{title}</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src={`https://picsum.photos/seed/${channelTitle}/50/50`}
            alt={channelTitle}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{channelTitle}</p>
            <p className="text-xs sm:text-sm text-gray-500">{formatNumber(subscriberCount)} subscribers</p>
          </div>
          <button 
            className={`ml-4 px-4 py-2 rounded-full text-sm font-semibold ${
              isSubscribed ? 'bg-gray-200 text-black' : 'bg-black text-white'
            }`}
            onClick={() => setIsSubscribed(!isSubscribed)}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">
            <ThumbsUp className="w-5 h-5 mr-1" />
            <span>{formatNumber(likeCount)}</span>
          </button>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">
            <ThumbsDown className="w-5 h-5" />
          </button>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">
            <Share2 className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full">
            <Download className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <p className="font-semibold text-sm">
          {formatNumber(viewCount)} views • {formatDate(publishedAt)}
        </p>
        <p className={`mt-2 text-sm ${showFullDescription ? '' : 'line-clamp-2'}`}>
          {description}
        </p>
        {description.length > 100 && (
          <button
            className="text-sm font-semibold mt-2 text-blue-600 hover:text-blue-800"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoInfo;
