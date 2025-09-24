import React, { use, useState } from 'react'
import { assets, doctorsData } from '../assets/assets/assets_frontend/assets'
import { data, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Zustand/useAuthStore';
import { useAppointmentStore } from '../Zustand/useAppointmentStore';
import { LoaderCircle } from 'lucide-react';

const DocProfile = () => {
  const { user } = useAuthStore()
  const { BookAppointment, booking } = useAppointmentStore()

  const { docID } = useParams();
  const doc = doctorsData.find((doctor) => doctor._id == docID)
  const RelatedDocs = doctorsData.filter((doct) => doct.speciality == doc.speciality && doct._id !== doc._id);
  const today = new Date();
  const daysArray = [];
  const slots = [];
  const [isTimeSelected, setisTimeSelected] = useState(null)
  const [isDaySelected, setisDaySelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState();


  const [day, setDay] = useState();
  const [time, setTime] = useState()

  function HandleDaySelect(idx, item) {
    setisDaySelected(idx)
    setDay(item)
    setSelectedIndex(idx)
  }

  function HandleTimeSelect(idx, items) {
    setisTimeSelected(idx)
    setTime(items)
  }

  async function HandleBookAppointment() {
    let AppointmentData = {
      PatientID: user._id,
      docID: docID,
      day: day?.day,
      date: day?.date,
      hour: time?.hour,
      minutes: time?.minutes,
    }
    //  AppointmentData = JSON.stringify(AppointmentData)
    await BookAppointment(AppointmentData);
  }


  function getSlotndDays(params) {
    // Get Days
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(today.getDate() + i);
      daysArray.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
      })
    }
  }
  getSlotndDays()

  function getTimingSlot() {

    let startHour = new Date().getHours();
    let currentMinutes = new Date().getMinutes();

    if (selectedIndex > 0) {
      startHour = 8;
      currentMinutes = 30;
    }

    if (currentMinutes >= 30) {
      startHour++;
      currentMinutes = '00';
    } else {
      currentMinutes = 30;
    }

    slots.push({ hour: startHour, minutes: currentMinutes },);

    let end = 16;
    let min = currentMinutes;

    while (startHour < end) {

      if (min === 30) {
        min = '00';
        startHour++;
      } else {
        min = 30;
      }
      slots.push({ hour: startHour, minutes: min })
    }


  }
  getTimingSlot()


  return (
    <div className='py-8 flex flex-col  '>
      {/* First Half */}
      <div className='flex flex-col md:flex-row justify-between gap-5 items-center md:items-start '>
        <img className='md:w-1/4 h-full bg-[#5F6FFF] rounded-md' src={doc.image} alt="" />
        <div className='flex   flex-col gap-4 border-1 border-gray-400 rounded-md px-3 py-5 md:px-10'>
          <div>
            <h1 className='text-2xl font-bold text-gray-700'>{doc.name} <i className="ri-verified-badge-fill text-blue-700"></i></h1>
            <p className='text-md text-gray-500'>MBBS - {doc.speciality} <span className='border-1 p-1 px-2 text-[10px] rounded-full'>{doc.experience}</span></p>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold'>About <i className="ri-information-line"></i></h1>
            <p className='text-sm text-gray-600'>{doc.about}</p>
          </div>
          <div>
            <p className='font-bold text-gray-600'>Appointment fee: $ {doc.fees}</p>
          </div>

        </div>
      </div>

      {/* Booking Section  */}

      <div className=' md:pl-13 pt-8'>
        <div className='flex flex-col   md:gap-5'>
          <h1 className='text-xl text-gray-700'>Booking slots</h1>
          <div className='flex flex-wrap my-8 md:my-0 md:flex-nowrap  gap-3 justify-between items-center text-center'>
            {
              daysArray.map((item, idx) => {
                const isSelected = isDaySelected === idx;
                return <div onClick={() => HandleDaySelect(idx, item)} key={idx} className={`${isSelected ? "bg-[blue] text-white" : "bg-white text-black"} hover:bg-[blue] transition-all duration-300 hover:text-white  cursor-pointer border-1  py-5 px-14 text-center flex flex-col  items-center w-20 border-gray-300 rounded-full`} >
                  <p>{item.day}</p>
                  <p>{item.date}</p>
                </div>
              })
            }
          </div>
          <div className='flex gap-3 overflow-x-auto scroll-smooth whitespace-nowrap pb-7 thin-scrollbar'>
            {slots.map((items, idx) => {
              const isSelected = isTimeSelected == idx;
              return <p onClick={(e => HandleTimeSelect(idx, items))} className={`${isSelected ? "bg-[blue] text-white" : "bg-white text-black"}  hover:bg-[blue] transition-all duration-300 hover:text-white cursor-pointer border-1 border-gray-400 px-6 py-2 rounded-full`} >{items.hour}:{items.minutes}</p>
            })}
          </div>
          <Link onClick={HandleBookAppointment} className=' cursor-pointer bg-[#5F6FFF] p-3 text-white mt-4 md:mt-0 rounded-full md:w-1/4 text-center flex justify-center items-center'>{booking ? <LoaderCircle className=' w-1/4 text-center animate-spin' size={24} color='black' /> : 'Book an appointment'}</Link>
        </div>

      </div>


      {/* Related Doctor  */}
      <div className='flex flex-col pt-15'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <h1 className='text-2xl text-gray-600 font-bold'>Related Doctors</h1>
          <p className='text-gray-400 text-sm'>Simply browse through our extensive list of trusted doctors</p>
        </div>
        <div className='flex gap-4 pt-10 '>
          {RelatedDocs.map((items, index) => (
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

export default DocProfile