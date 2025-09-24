import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
const About = () => {
  return (
    <div className='pt-10 flex flex-col justify-center items-center'>
      <h1 className='text-xl text-gray-600 font-bold'>ABOUT US</h1>
      <div className=' w-full flex justify-center gap-10 pt-10 flex-col md:flex-row'>
        <img className='w-80 shadow-lg rounded-md' src={assets.about_image} alt="" />
        <div className=' md:w-1/2 flex flex-col gap-3'>
          <p className='pt-1 text-sm text-gray-600'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records. <br /> <br /> Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <h1 className='font-bold'>Our Vision</h1>
          <p className='pt-2 text-sm text-gray-600'>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className=' flex flex-col pt-20 w-full gap-4'>
        <h1 className='text-xl text-gray-600 font-bold'>WHY CHOOSE US</h1>
        <div className='flex flex-col gap-4 md:gap-0 md:flex-row'>
          <div className=" gap-3 cursor-pointer transition-all duration-500 hover:bg-[#5F6FFF] box md:w-1/3 p-15 flex flex-col justify-center items-start border-1 border-gray-300 hover:text-white">
            <h1 >EFFICIENCY:</h1>
          
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className=" gap-3 box md:w-1/3 p-15 flex flex-col justify-center items-start border-1 border-gray-300 cursor-pointer transition-all duration-500 hover:bg-[#5F6FFF] hover:text-white">
            <h1>CONVENIENCE::</h1>
         
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="gap-3 box md:w-1/3 p-15 flex flex-col justify-center items-start border-1 cursor-pointer transition-all duration-500 hover:bg-[#5F6FFF] hover:text-white border-gray-300">
            <h1>PERSONALIZATION:</h1>
           
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About