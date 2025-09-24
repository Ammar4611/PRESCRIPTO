import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'


function Footer() {
    return (
       <div className='flex  flex-col  justify-center items-center '>

        {/* firstpart */}
        <div className='flex flex-col gap-5 pt-15 justify-between md:flex-row md:gap-0'>
            
       
        <div className='  flex flex-col gap-3 md:w-1/3'>
            <img className='w-50' src={assets.logo} alt="" />
            <p className='text-[10px]  text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>


        {/* second part */}
        <div className=' w-1/3 flex flex-col gap-3'>
            <h1 className='font-bold'>Company</h1>
            <ul>
                <li className='text-sm  text-gray-700'>Home</li>
                <li className='text-sm  text-gray-700'>About</li>
                <li className='text-sm  text-gray-700'>Delivery</li>
                <li className='text-sm  text-gray-700'>Privacy policy</li>
            </ul>
        </div>


        {/* ThirdPart */}

        <div className=''>
            <h1 className='font-bold'>GET IN TOUCH</h1>
            <ul>
                <li className='text-sm  text-gray-700'>+0-000-000-000</li>
                <li className='text-sm  text-gray-700'>ammar.offical045@gmail.com</li>
            </ul>
        </div>
       </div>
        <footer className='text-[14px] pb-2 mt-10 text-center md:p-15 md:mt-0 md:pb-0 '>Copyright 2024 @MuhammadAmmar.dev - All Right Reserved.</footer>
        </div>
    )
}

export default Footer