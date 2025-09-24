import React from 'react'
import { specialityData } from '../assets/assets/assets_frontend/assets'
import { Link} from 'react-router-dom';


const SpecialityMenu = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center pt-10 gap-8  px-2 md:px-0'>
        <div className='flex flex-col justify-center items-center text-center gap-2 '>
            <h1 className='text-2xl  font-bold md:text-3xl '>Find by Speciality</h1>
            <p className='text-sm  md:w-1/1'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        </div>
        
        <div className='flex flex-wrap justify-center gap-4 text-center items-center '> 
            {

                specialityData.map((item, index)=>(
            
                <Link to={`/All-Doctors/${item.speciality}`} className='flex flex-col transition-all duration-500  items-center gap-3 hover:-translate-y-[5%] ' key={index}>
                    <img className=''  src={item.image} alt=""  />
                    <p className='text-sm'>{item.speciality}</p>
                </Link>
             

                ))
            }
                </div>
    </div>
  )
}

export default SpecialityMenu