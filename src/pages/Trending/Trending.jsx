import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Flame, ChevronDown, ThumbsUp } from 'lucide-react';

const Trending = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Now');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    // Fetch trending videos from an API
    // This is a mock implementation
    setVideos([
      { id: 1, title: 'Viral Dance Challenge', channel: 'Dance Trends', views: '5.2M', timestamp: '2 days ago', thumbnail: 'https://picsum.photos/seed/1/320/180', duration: '3:45', description: 'Join the latest dance craze sweeping the internet!', likes: '250K' },
      { id: 2, title: 'Latest Tech Gadget Review', channel: 'Tech Today', views: '1.8M', timestamp: '1 day ago', thumbnail: 'https://picsum.photos/seed/2/320/180', duration: '12:30', description: 'We review the most anticipated tech release of the year.', likes: '120K' },
      { id: 3, title: 'Breaking News: Global Event', channel: 'World News Network', views: '3.5M', timestamp: '5 hours ago', thumbnail: 'https://picsum.photos/seed/3/320/180', duration: '8:15', description: 'Stay updated with the latest developments in this ongoing global event.', likes: '180K' },
      { id: 4, title: 'Funny Cat Compilation', channel: 'Pet Lovers', views: '7.9M', timestamp: '3 days ago', thumbnail: 'https://picsum.photos/seed/4/320/180', duration: '15:20', description: 'Laugh out loud with these hilarious cat videos!', likes: '500K' },
      { id: 5, title: 'New Movie Trailer', channel: 'Cinema Central', views: '4.1M', timestamp: '1 day ago', thumbnail: 'https://picsum.photos/seed/5/320/180', duration: '2:30', description: 'Get a first look at the most anticipated movie of the year.', likes: '300K' },
    ]);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-gray-800 flex items-center">
            <Flame className="w-8 h-8 mr-2 text-red-500" />
            Trending
          </h1>
          <div className="relative w-full sm:w-48">
            <button 
              className="flex items-center justify-between w-full text-sm text-gray-700 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>{selectedCategory}</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10">
                {['Now', 'Music', 'Gaming', 'Movies'].map((category) => (
                  <button 
                    key={category}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {videos.map((video, index) => (
            <div key={video.id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="relative w-full sm:w-64 h-48 sm:h-36 flex-shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none" />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
                <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                  #{index + 1} on Trending
                </div>
              </div>
              <div className="flex-grow p-4">
                <h3 className="font-semibold mb-1 text-base sm:text-lg text-gray-800 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
                <p className="text-xs text-gray-500 mb-2">{`${video.views} views • ${video.timestamp}`}</p>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{video.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>{video.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;