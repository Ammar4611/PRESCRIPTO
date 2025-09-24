import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from '../Zustand/useAuthStore';
import { LoaderCircle } from 'lucide-react';

const Navbar = () => {


  const [dropDown, setdropDown] = useState(false)

  const { getProfile, user, checking, logout } = useAuthStore();


  useEffect(() => {
    getProfile();

  }, [getProfile])

  async function handleLogout() {
    await logout()
  }

  return (
    <div className='flex items-center justify-between text-center py-5 border-b border-gray-300'>
      <NavLink to={'/'}>
        <img className='w-40' src={assets.logo} alt="" />
      </NavLink>
      <ul className='hidden md:flex gap-5 '>
        <NavLink className='relative text-md font-bold text-gray-700  transition-colors duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full' to={'/'}>HOME</NavLink>
        <NavLink className='relative text-md font-bold text-gray-700  transition-colors duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full' to={'/All-Doctors'}>ALL DOCTORS</NavLink>
        <NavLink className='relative text-md font-bold text-gray-700  transition-colors duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full' to={'/Contact'}>CONTACT</NavLink>
        <NavLink to="/About" className=" relative text-md font-bold text-gray-700  transition-colors duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-700 after:transition-all after:duration-300 hover:after:w-full ">ABOUT</NavLink>
      </ul>
      <div>
        {
          checking ? <div className='flex justify-center items-center'><LoaderCircle className='animate-spin' /></div> :
            user?.verified == 'true' ?
              <div className="relative flex items-center gap-2 group">
                <img className="w-10 rounded-full" src={assets.profile_pic} alt="" />
                <i onClick={() => { dropDown ? setdropDown(false) : setdropDown(true) }} className={`cursor-pointer  ${dropDown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`}></i>

                <div
                  className={`${dropDown ? 'block' : 'hidden'}  z-500 absolute right-0 top-16 w-45 rounded-md bg-gray-100 p-4 text-start shadow-lg`}
                >
                  <div className="flex flex-col gap-5  z-500 ">
                    <Link to={'/My-Profile'}>
                    <p className='cursor-pointer text-gray-600 hover:text-black'>My Profile</p>
                    </Link>
                    <Link to={'/My-Appointments'}>
                    <p className='cursor-pointer text-gray-600 hover:text-black'>My Appointments</p>
                    </Link>
                    <p onClick={handleLogout} className='cursor-pointer text-gray-600 hover:text-black'>Logout</p>
                  </div>
                </div>
              </div>
              :
              <Link to={'/login'}>  <button className='cursor-pointer text-sm bg-blue-700  px-3 py-2  rounded-md text-white md:py-2 md:px-5 md:text-md'>Sign-in</button></Link>
        }
      </div>
    </div>
  )
}

export default Navbar