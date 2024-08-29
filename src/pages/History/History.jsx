import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Trash2, Clock, Filter, Search, ChevronDown, X, Calendar } from 'lucide-react';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryTypeOpen, setIsHistoryTypeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch watch history from an API
    // This is a mock implementation
    setVideos([
      { id: 1, title: 'How to Build a React App', channel: 'React Tutorials', views: '1.2M', timestamp: '2 days ago', thumbnail: 'https://picsum.photos/seed/1/320/180', duration: '15:23' },
      { id: 2, title: 'Advanced JavaScript Concepts', channel: 'JS Mastery', views: '890K', timestamp: '1 week ago', thumbnail: 'https://picsum.photos/seed/2/320/180', duration: '22:47' },
      { id: 3, title: 'CSS Grid Layout Tutorial', channel: 'CSS Tricks', views: '450K', timestamp: '3 hours ago', thumbnail: 'https://picsum.photos/seed/3/320/180', duration: '10:05' },
      { id: 4, title: 'Node.js Crash Course', channel: 'Backend Dev', views: '2.1M', timestamp: '5 days ago', thumbnail: 'https://picsum.photos/seed/4/320/180', duration: '45:12' },
      { id: 5, title: 'Redux for Beginners', channel: 'State Management', views: '680K', timestamp: '2 weeks ago', thumbnail: 'https://picsum.photos/seed/5/320/180', duration: '18:36' },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsHistoryTypeOpen(false);
  };

  const filteredVideos = videos.filter(video =>
    (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedDate || video.timestamp.includes(selectedDate))
  );

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-gray-800">Watch history</h1>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button 
              className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto mb-2 sm:mb-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-4 h-4 mr-2" />
              <span>Search history</span>
            </button>
            <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
              <button 
                className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full"
                onClick={() => setIsHistoryTypeOpen(!isHistoryTypeOpen)}
              >
                <Clock className="w-4 h-4 mr-2" />
                <span>{selectedDate || 'History type'}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {isHistoryTypeOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg z-10">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDateSelect('Today')}
                  >
                    Today
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDateSelect('This week')}
                  >
                    This week
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDateSelect('This month')}
                  >
                    This month
                  </button>
                </div>
              )}
            </div>
            <button className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto mb-2 sm:mb-0">
              <Trash2 className="w-4 h-4 mr-2" />
              <span>Clear history</span>
            </button>
            <button className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              <span>Manage history</span>
            </button>
          </div>
        </div>
        {isSearchOpen && (
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search watch history"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        {selectedDate && (
          <div className="mb-4 flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Showing results for: {selectedDate}</span>
            <button
              onClick={() => setSelectedDate(null)}
              className="ml-2 text-blue-500 hover:text-blue-600"
            >
              Clear
            </button>
          </div>
        )}
        <div className="space-y-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video.id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full sm:w-40 h-48 sm:h-24 flex-shrink-0">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none" />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-grow p-4">
                  <h3 className="font-semibold mb-1 text-base sm:text-lg text-gray-800 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
                  <p className="text-xs text-gray-500">{`${video.views} views • ${video.timestamp}`}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700 p-4 transition-colors duration-200 self-end sm:self-auto">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No videos found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;