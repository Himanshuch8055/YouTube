import React, { useState, useEffect } from 'react'
import YTLogo from '../../assets/YouTube-Logo.svg'
import { Menu, Search, User, Bell, Video, Mic, ArrowLeft } from 'lucide-react'

const Header = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setShowSearch(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className='flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-50'>
      {/* Logo and menu */}
      <div className={`flex items-center space-x-2 sm:space-x-4 ${showSearch && isMobile ? 'hidden' : 'w-full md:w-auto'}`}>
        <button className='p-2 hover:bg-gray-100 rounded-full transition duration-300' aria-label="Menu">
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <img src={YTLogo} alt="YouTube Logo" className='w-20 sm:w-24 md:w-28 lg:w-32 cursor-pointer' />
      </div>
      {/* Search bar */}
      <div className={`${showSearch || !isMobile ? 'flex' : 'hidden'} flex-grow max-w-3xl mx-2 sm:mx-4 mt-2 md:mt-0 order-3 md:order-2 w-full md:w-auto`}>
        {isMobile && showSearch && (
          <button 
            className='mr-2 p-2 hover:bg-gray-100 rounded-full transition duration-300' 
            onClick={() => setShowSearch(false)}
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        )}
        <div className='flex w-full'>
          <input 
            type="text" 
            placeholder='Search'
            className='w-full px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300'
          />
          <button className='bg-gray-100 px-3 sm:px-5 py-1 sm:py-2 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200 transition duration-300' aria-label="Search">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button className='ml-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300 hidden sm:block' aria-label="Voice search">
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 stroke-2" />
          </button>
        </div>
      </div>
      {/* User actions */}
      <div className={`flex items-center space-x-1 sm:space-x-2 md:space-x-4 order-2 md:order-3 ${showSearch && isMobile ? 'hidden' : ''}`}>
        <button 
          className='md:hidden p-2 hover:bg-gray-100 rounded-full transition duration-300' 
          aria-label="Search" 
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <button className='p-2 hover:bg-gray-100 rounded-full transition duration-300 hidden md:block' aria-label="Create">
          <Video className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <button className='p-2 hover:bg-gray-100 rounded-full transition duration-300' aria-label="Notifications">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <button className='p-2 hover:bg-gray-100 rounded-full transition duration-300' aria-label="Account">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
      </div>
    </header>
  )
}

export default Header