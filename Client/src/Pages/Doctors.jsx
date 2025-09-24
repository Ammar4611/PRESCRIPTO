import React from 'react'
import { useParams } from 'react-router-dom'
import { doctorsData } from '../assets/assets/assets_frontend/assets';
import { Link} from 'react-router-dom';

const Doctors = () => {

  const { speciality } = useParams();
  const AllDoctors = doctorsData;
  const filteredDoctors = AllDoctors.filter((item) => item.speciality == speciality)
 

  return (
    <div>
    <p className=' md:flex  pt-5 text-md text-gray-500'>Browse through the doctors specialist</p>
    <div className='flex flex-col w-full md:flex-row '>
      {/* left Specility Selector */}
      <div className='pt-10 md:w-1/3 p-2 md:pr-10'>
      <div className='flex flex-col  gap-5'>
        <Link to={'/All-Doctors/General_physician'}className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200' >General physician</Link>
        <Link to={'/All-Doctors/Gynecologist'} className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200' >Gynecologist</Link>
        <Link className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200' to={'/All-Doctors/Dermatologist'}>Dermatologist</Link>
        <Link to={'/All-Doctors/Pediatricians'} className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200' >Pediatricians</Link>
        <Link to={'/All-Doctors/Neurologist'} className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200' >Neurologist</Link>
        <Link to={'/All-Doctors/Gynecologist'} className='p-2 text-center  border-1 rounded-sm text-sm text-gray-500  border-red-200'>Gastroenterologist</Link>
      </div>
      </div>

    {/* Right Side Doctors Part */}

   <div className='w-[100%] flex flex-wrap gap-10  justify-center pt-10 '>
                 { speciality ? filteredDoctors.map((items , index)=>(
                 <Link className=' flex flex-col border-1 rounded-lg border-gray-200 w-60 text-start gap-2 transition-all duration-300 hover:translate-y-[-4%] ' to={`/appointments/${items._id}`}>
                  
                      <img className='bg-[#EAEFFF]  ' key={index} src={items.image} alt="" />
                      <div className='p-2'>
                      <p className='text-[#22CA88] text-sm pl-2'>Avalibale</p>
                      <p className='font-bold pl-2'>{items.name}</p>
                      <p className='text-sm text-gray-400 pl-2'>{items.speciality}</p>
                      </div>
      
                  </Link>
                 ))
                 
                 
                 :AllDoctors.map((items , index) =>(
                   <Link className=' flex flex-col border-1 rounded-lg border-gray-200 w-60 text-start gap-2 transition-all duration-300 hover:translate-y-[-4%] ' to={`/appointments/${items._id}`}>
                  
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
    </div>
</div>

  )
}

export default Doctors