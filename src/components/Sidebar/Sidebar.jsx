import React, { useState, useEffect, useMemo } from 'react'
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Film, Flame, ShoppingBag, Music2, Gamepad2, Newspaper, Trophy, Lightbulb, Shirt, ChevronRight, ChevronLeft, History, Clapperboard, ThumbsUp as LikeIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [screenSize, setScreenSize] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('sm');
        setIsCollapsed(true);
      } else if (window.innerWidth < 768) {
        setScreenSize('md');
        setIsCollapsed(true);
      } else if (window.innerWidth < 1024) {
        setScreenSize('lg');
        setIsCollapsed(false);
      } else {
        setScreenSize('xl');
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarItems = useMemo(() => [
    {
      title: null,
      items: [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Compass, label: 'Explore', path: '/explore' },
        { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
      ]
    },
    {
      title: 'You',
      items: [
        { icon: History, label: 'History', path: '/history' },
        { icon: Clapperboard, label: 'Your videos', path: '/your-videos' },
        { icon: LikeIcon, label: 'Liked videos', path: '/liked-videos' },
      ]
    },
    {
      title: 'Explore',
      items: [
        { icon: Flame, label: 'Trending', path: '/trending' },
        { icon: ShoppingBag, label: 'Shopping', path: '/shopping' },
        { icon: Music2, label: 'Music', path: '/music' },
        { icon: Film, label: 'Movies & TV', path: '/movies-tv' },
        { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
        { icon: Newspaper, label: 'News', path: '/news' },
        { icon: Trophy, label: 'Sports', path: '/sports' },
        { icon: Lightbulb, label: 'Learning', path: '/learning' },
        { icon: Shirt, label: 'Fashion & Beauty', path: '/fashion-beauty' },
      ]
    }
  ], []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`
      ${isCollapsed ? 'w-16 sm:w-20' : 'w-64'} 
      h-[calc(100vh-56px)] 
      bg-white 
      overflow-y-auto 
      shadow-md 
      transition-all 
      duration-300 
      ease-in-out 
      ${screenSize === 'sm' || screenSize === 'md' ? 'fixed left-0 top-14 z-50' : 'sticky top-14'}
    `}>
      {(screenSize === 'sm' || screenSize === 'md' || screenSize === 'lg') && (
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      )}
      <nav className={`p-2 ${isCollapsed ? 'pt-12' : ''}`}>
        {sidebarItems.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {!isCollapsed && section.title && (
              <h3 className="px-4 py-2 text-sm font-semibold text-gray-500">{section.title}</h3>
            )}
            <ul className="mb-4">
              {section.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={itemIndex} className="mb-1">
                    <Link
                      to={item.path}
                      className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                        isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon className={`w-6 h-6 ${isCollapsed ? '' : 'mr-4'} ${isActive ? 'text-red-600' : 'text-gray-600'}`} />
                      {!isCollapsed && <span className={`text-sm ${isActive ? 'text-black' : 'text-gray-700'}`}>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {!isCollapsed && sectionIndex < sidebarItems.length - 1 && <hr className="my-2 border-gray-200" />}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar