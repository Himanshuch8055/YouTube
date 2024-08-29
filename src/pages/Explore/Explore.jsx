import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Music, Gamepad2, Newspaper, Trophy, Lightbulb, Film, ShoppingBag, Mic2, Radio, Clock, ThumbsUp } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';

const ExploreSection = ({ icon: Icon, title, link, color }) => (
  <Link to={link} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <Icon className={`w-8 h-8 mb-2 ${color}`} />
    <span className="text-sm font-medium text-center">{title}</span>
  </Link>
);

const Explore = () => {
  const sections = [
    { icon: Flame, title: 'Trending', link: '/trending', color: 'text-red-600' },
    { icon: Music, title: 'Music', link: '/music', color: 'text-purple-600' },
    { icon: Gamepad2, title: 'Gaming', link: '/gaming', color: 'text-green-600' },
    { icon: Newspaper, title: 'News', link: '/news', color: 'text-blue-600' },
    { icon: Trophy, title: 'Sports', link: '/sports', color: 'text-yellow-600' },
    { icon: Lightbulb, title: 'Learning', link: '/learning', color: 'text-indigo-600' },
    { icon: Film, title: 'Movies & Shows', link: '/movies-shows', color: 'text-pink-600' },
    { icon: ShoppingBag, title: 'Fashion & Beauty', link: '/fashion-beauty', color: 'text-teal-600' },
    { icon: Radio, title: 'Live', link: '/live', color: 'text-red-500' },
    { icon: Clock, title: 'History', link: '/history', color: 'text-gray-600' },
    { icon: ThumbsUp, title: 'Liked Videos', link: '/liked-videos', color: 'text-blue-500' },
    { icon: Mic2, title: 'Podcasts', link: '/podcasts', color: 'text-orange-600' },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Explore</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {sections.map((section, index) => (
              <ExploreSection key={index} {...section} />
            ))}
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">More from YouTube</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Link to="/youtube-premium" className="flex items-center justify-center p-6 bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                <span className="text-lg font-medium text-white">YouTube Premium</span>
              </Link>
              <Link to="/youtube-music" className="flex items-center justify-center p-6 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors">
                <span className="text-lg font-medium text-white">YouTube Music</span>
              </Link>
              <Link to="/youtube-kids" className="flex items-center justify-center p-6 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                <span className="text-lg font-medium text-white">YouTube Kids</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;