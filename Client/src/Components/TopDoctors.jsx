import React from 'react'
import { doctorsData } from '../assets/assets/assets_frontend/assets'
import { Link } from 'react-router-dom';

const TopDoctors = () => {
  return (
    <div className='flex flex-col items-center pt-15 text-center md:pt-10  '>
        <h1 className='text-2xl font-bold pb-2 md:text-3xl'>Top Doctors to Book</h1>
        <p className=' w-61 text-sm md:w-1/1'>Simply browse through our extensive list of trusted doctors</p>

        <div className='flex flex-wrap gap-10 justify-center pt-15 '>
               { doctorsData.map((items , index) =>(
                <Link className=' flex flex-col border-1 rounded-lg border-gray-200 w-60 text-start gap-2 transition-all duration-300 hover:translate-y-[-4%] ' to={`appointments/${items._id}`}>
                
                    <img className='bg-[#EAEFFF]  ' key={index} src={items.image} alt="" />
                    <div className='p-2'>
                    <p className='text-[#22CA88] text-sm pl-2'>Avalibale</p>
                    <p className='font-bold pl-2'>{items.name}</p>
                    <p className='text-sm text-gray-400 pl-2'>{items.speciality}</p>
                    </div>
    
                </Link>

                ))
            }
        </div>
        <div className='p-20'>
            <Link className='bg-cyan-100  hover:bg-amber-100 p-3  px-5 rounded-full' to={'/All-Doctors'}>More</Link>
        </div>
    </div>
  )
}

export default TopDoctors