import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='mt-7 text-white flex flex-col-reverse   bg-blue-500 rounded-lg md:flex-row'>
        {/* left Side */}
        <div className=' w-[100%] flex gap-1 flex-col justify-center text-center pb-4 px-3 md:pl-15 md:gap-4 md:text-start'>
            <p className='font-extrabold text-xl md:text-4xl'>Book Appointment <br /></p>
            <p className='font-extrabold text-xl md:text-4xl'>With Trusted Doctors</p>
            <div className='flex flex-col items-center gap-5 md:flex-row md:items-start'>
                <img className='w-30 h-10' src={assets.group_profiles} alt="" />
                <p className='text-sm'> Simply browse through our extensive list of trusted doctors, <br />schedule your appointment hassle-free.</p>
            </div>
            
            <button className='bg-white cursor-pointer w-full flex text-gray-600 p-2 px-5 w-fit gap-5 justify-center items-center rounded-full hover:scale-110 transition-all duration-300 md:w-fit'>Book Appointment <img src={assets.arrow_icon} alt="" /> </button>
            
        </div>



        {/* Right Side  */}
        <div className='w-full flex justify-center items-center text-center p-5 md:pr-15 md:items-end'>
            <img className='w-full' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header