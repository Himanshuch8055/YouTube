import React, { useState, useEffect, useMemo } from 'react'
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Film, Flame, ShoppingBag, Music2, Gamepad2, Newspaper, Trophy, Lightbulb, Shirt, History, Clapperboard, ThumbsUp as LikeIcon } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../../utils/navSlice'

const Sidebar = () => {
  const isMenu = useSelector((store) => store.nav.isMenuOpen)
  const [screenSize, setScreenSize] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('sm');
      } else if (window.innerWidth < 768) {
        setScreenSize('md');
      } else if (window.innerWidth < 1024) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
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

  const handleItemClick = (path) => {
    navigate(path);
    if (screenSize === 'sm' || screenSize === 'md') {
      dispatch(toggleMenu());
    }
  };

  if (!isMenu) return null;

  return (
    <aside className={`
      w-64
      h-[calc(100vh-56px)] 
      bg-white 
      overflow-y-auto 
      shadow-md 
      transition-all 
      duration-300 
      ease-in-out 
      ${screenSize === 'sm' || screenSize === 'md' ? 'fixed left-0 top-14 z-50' : 'sticky top-14'}
    `}>
      <nav className="p-2">
        {sidebarItems.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {section.title && (
              <h3 className="px-4 py-2 text-sm font-semibold text-gray-500">{section.title}</h3>
            )}
            <ul className="mb-4">
              {section.items.map((item, itemIndex) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={itemIndex} className="mb-1">
                    <button
                      onClick={() => handleItemClick(item.path)}
                      className={`flex items-center p-2 rounded-lg transition-colors duration-200 w-full text-left ${
                        isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className={`w-6 h-6 mr-4 ${isActive ? 'text-red-600' : 'text-gray-600'}`} />
                      <span className={`text-sm ${isActive ? 'text-black' : 'text-gray-700'}`}>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {sectionIndex < sidebarItems.length - 1 && <hr className="my-2 border-gray-200" />}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar