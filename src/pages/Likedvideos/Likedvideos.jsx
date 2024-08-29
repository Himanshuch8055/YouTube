import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { ThumbsUp, Search, ChevronDown, X, Filter } from 'lucide-react';

const Likedvideos = () => {
  const [videos, setVideos] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Date added (newest)');

  useEffect(() => {
    // Fetch liked videos from an API
    // This is a mock implementation
    setVideos([
      { id: 1, title: 'React Hooks Tutorial', channel: 'React Masters', views: '1.2M', likedDate: '2 days ago', thumbnail: 'https://picsum.photos/seed/1/320/180', duration: '15:23' },
      { id: 2, title: 'Advanced CSS Techniques', channel: 'CSS Wizards', views: '890K', likedDate: '1 week ago', thumbnail: 'https://picsum.photos/seed/2/320/180', duration: '22:47' },
      { id: 3, title: 'JavaScript ES6+ Features', channel: 'JS Guru', views: '450K', likedDate: '3 days ago', thumbnail: 'https://picsum.photos/seed/3/320/180', duration: '10:05' },
      { id: 4, title: 'Node.js for Beginners', channel: 'Backend Basics', views: '2.1M', likedDate: '1 month ago', thumbnail: 'https://picsum.photos/seed/4/320/180', duration: '45:12' },
      { id: 5, title: 'Vue.js vs React', channel: 'Framework Showdown', views: '680K', likedDate: '2 weeks ago', thumbnail: 'https://picsum.photos/seed/5/320/180', duration: '18:36' },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSortSelect = (option) => {
    setSortBy(option);
    setIsSortOpen(false);
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-gray-800">Liked videos</h1>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button 
              className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto mb-2 sm:mb-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-4 h-4 mr-2" />
              <span>Search liked videos</span>
            </button>
            <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
              <button 
                className="flex items-center justify-center text-sm text-gray-700 hover:text-gray-900 bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                <span>{sortBy}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {isSortOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-white rounded-md shadow-lg z-10">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSortSelect('Date added (newest)')}
                  >
                    Date added (newest)
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSortSelect('Date added (oldest)')}
                  >
                    Date added (oldest)
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSortSelect('Most popular')}
                  >
                    Most popular
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isSearchOpen && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search liked videos"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <p className="text-xs text-gray-500">{`${video.views} views • Liked ${video.likedDate}`}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700 p-4 transition-colors duration-200 self-end sm:self-auto">
                  <ThumbsUp className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No liked videos found. Try adjusting your search or like some videos!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Likedvideos;