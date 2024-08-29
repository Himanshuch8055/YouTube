import React from 'react'
import ButtonList from '../ButtonList/ButtonList'
import VideoContainer from '../VideoContainer/VideoContainer'

const HomeMainContainer = () => {
  return (
    <div className="flex-grow overflow-y-auto">
      <div className="max-w-screen-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-white">
          <ButtonList />
        </div>
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
          <VideoContainer />
        </div>
      </div>
    </div>
  )
}

export default HomeMainContainer