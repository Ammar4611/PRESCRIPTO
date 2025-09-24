import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
const Banner = () => {
  return (
    <div className='bg-[#5F6FFF] relative flex flex-col-reverse   justify-between p-5 mb-10 rounded-lg items-center h-[57vh] mt-36 md:flex-row md:mt-0 md:p-0 '>
        <div className=' flex flex-col gap-2 md:pl-15'>
            <p className='font-extrabold text-2xl text-white md: text-4xl '>Book Appointment <br /> With 100+<br />Trusted Doctors</p>
             <button className='bg-white w-full cursor-pointer flex text-gray-600 p-2 px-5 w-fit gap-5 justify-center items-center rounded-full hover:scale-110 transition-all duration-300 '>Create Account</button>         
        </div>
        

        <div className='flex justify-center pt-5'>
            <img  className='w-1/1 md:w-1/3' src={assets.appointment_img} alt="" />

        </div>
    </div>
  )
}

export default Banner