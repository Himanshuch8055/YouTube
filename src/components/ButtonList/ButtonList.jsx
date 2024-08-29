import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ButtonList = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [activeButton, setActiveButton] = useState('All')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const scrollContainerRef = useRef(null)

  const buttons = [
    'All', 'Music', 'Gaming', 'Live', 'Podcasts', 'Cooking', 'Recently uploaded',
    'New to you', 'Watched', 'Trending', 'Sports', 'Fashion',
  ]

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      handleScroll()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [handleScroll])

  const scroll = useCallback((direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className="sticky top-14 bg-white z-10">
      <div className="relative">
        {!isMobile && showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10 hover:bg-white transition duration-300"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-3 py-2 sm:py-3 px-2 sm:px-4"
        >
          {buttons.map((button) => (
            <button
              key={button}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition duration-300 ${
                activeButton === button
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setActiveButton(button)}
            >
              {button}
            </button>
          ))}
        </div>
        {!isMobile && showRightArrow && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md z-10 hover:bg-white transition duration-300"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ButtonList