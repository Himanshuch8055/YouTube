import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { User, Bell } from 'lucide-react';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch subscriptions and videos from an API
    // This is a mock implementation
    setSubscriptions([
      { id: 1, name: 'Channel 1', subscribers: '1.2M' },
      { id: 2, name: 'Channel 2', subscribers: '500K' },
      { id: 3, name: 'Channel 3', subscribers: '2.5M' },
      { id: 4, name: 'Channel 4', subscribers: '750K' },
      { id: 5, name: 'Channel 5', subscribers: '3.1M' },
    ]);

    setVideos([
      { id: 1, title: 'Exciting New Technology Unveiled', channel: 'Channel 1', views: '1.2M', timestamp: '2 days ago', thumbnail: 'https://picsum.photos/seed/1/320/180' },
      { id: 2, title: 'Top 10 Travel Destinations for 2023', channel: 'Channel 2', views: '890K', timestamp: '1 week ago', thumbnail: 'https://picsum.photos/seed/2/320/180' },
      { id: 3, title: 'Easy 30-Minute Recipes for Busy People', channel: 'Channel 3', views: '450K', timestamp: '3 hours ago', thumbnail: 'https://picsum.photos/seed/3/320/180' },
      { id: 4, title: 'The Future of Artificial Intelligence', channel: 'Channel 4', views: '2.1M', timestamp: '5 days ago', thumbnail: 'https://picsum.photos/seed/4/320/180' },
      { id: 5, title: "Beginner's Guide to Home Workouts", channel: 'Channel 5', views: '680K', timestamp: '2 weeks ago', thumbnail: 'https://picsum.photos/seed/5/320/180' },
    ]);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Subscriptions</h1>
        <div className="flex mb-6 sm:mb-8 space-x-4 sm:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2 relative">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
                <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1">
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">{sub.name}</span>
              <span className="text-xs text-gray-500 hidden sm:block">{sub.subscribers} subscribers</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-40 sm:h-48 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  12:34
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base line-clamp-2">{video.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{video.channel}</p>
                <p className="text-xs text-gray-500">{`${video.views} views • ${video.timestamp}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;