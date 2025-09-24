import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
const Contact = () => {
  return (
    <div >
      <div className='flex flex-col justify-center items-center pt-15 pb-6 gap-12 md;pb-0 '>
        {/* Picside/ */}
        <h1 className='text-2xl font-bold text-gray-600'>Contact Us</h1>
        <div className='flex  flex-col  justify-center items-start md:items-center gap-10 md:gap-20 w-full md:flex-row'>
          <img className='shadow-lg  rounded-md md:w-1/3' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-5 md:gap-0 md:flex-row'>
          <div>
          <p className='text-xl text-gray-500 font-bold'>Our Office</p>
          <p className='pt-2 text-gray-500'>SoonValley Dist Kushab <br />Punjab Pakistan</p>
         
          <p className='pt-2 text-gray-500'>tele-0328-7532146</p>
          <p className='pt-2 text-gray-500'>Email-ammar.offical045@gmail.com</p> 
          </div>
          <div>
            <br />
            <p className='text-xl text-gray-500 font-bold'>CARRERS AT PRESCRIPTO</p>
            <button className=' p-3 rounded-md bg-blue-100 mt-2 hover:bg-blue-300 cursor-pointer'>Explores jObs</button>
          </div>
        </div>
      </div>
    </div>
        </div>
  )
}

export default Contact