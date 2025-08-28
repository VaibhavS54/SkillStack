import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'

function Educator() {
  return (
    <div className='text-gray-200 min-h-screen bg-gray-950'>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1 p-4 bg-gray-950'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Educator
