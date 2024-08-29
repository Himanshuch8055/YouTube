import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import HomeMainContainer from '../../components/HomeMainContainer/HomeMainContainer'

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <HomeMainContainer />
    </div>
  )
}

export default Home