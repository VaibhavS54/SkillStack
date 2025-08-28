import React from 'react'
import { assets } from '../../assets/assets.js'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 py-3 border-b bg-white shadow-sm">
      
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-36 hover:opacity-90 transition" />
      </Link>

      {/* User Info */}
      <div className="flex items-center gap-4 text-gray-600">
        <p className="hidden sm:block font-medium">
          Hi, <span className="text-blue-600">{user ? user.fullName : 'Developer'}</span>
        </p>
        {user 
          ? <UserButton afterSignOutUrl="/" /> 
          : <img className="w-10 h-10 rounded-full border border-gray-300" src={assets.profile_img} alt="Profile" />
        }
      </div>
    </nav>
  )
}

export default Navbar
