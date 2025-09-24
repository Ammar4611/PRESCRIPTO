import React, { useEffect } from 'react'
import { useAppointmentStore } from '../Zustand/useAppointmentStore'
import { useAuthStore } from '../Zustand/useAuthStore'
import { assets, doctorsData } from '../assets/assets/assets_frontend/assets'

const MyAppointments = () => {
  const { user } = useAuthStore()
  const { getMyAppointments, appointments, CancelAppointment } = useAppointmentStore()
  const PatientID = user._id

  useEffect(() => {
    async function checkAppointments() {
      await getMyAppointments(PatientID)
    }
    checkAppointments()
  }, [handleCancel])


  async function handleCancel(id) {
    const cancelID = {
      _id: id
    }
    await CancelAppointment(cancelID);

  }
  return (
    <div className='pt-8 flex flex-col md:flex-col gap-3'>
      <h1 className='text-gray-600 font-bold'>My Appointments</h1>
      {
        appointments.map((item, idx) => {
          const docID = item.docID
          const doctorInfo = doctorsData.find((e) => e._id === docID)
          return <div key={idx} className='flex flex-col md:flex-row justify-between items-center border-y-1 w-full relative border-gray-300 p-5 gap-4 md:gap-0'>
            <div className='flex flex-col md:flex-row gap-5'>
              <img className=' md:w-1/3 rounded-md' src={doctorInfo.image} alt="" />
              <div className='flex  flex-col'>
                <h1 className='font-bold font-md text-gray-700'>{doctorInfo.name}</h1>
                <p className='pb-1 text-gray-400 text-[15px]'>{doctorInfo.speciality}</p>
                <h1 className=' font-bold font-md text-gray-700'>Address</h1>
                <p className='pb-3 w-[60%] font-sm text-gray-400'> {doctorInfo.address.line1}, {doctorInfo.address.line2}</p>
                <p className='font-md text-gray-700 font-bold'>Date&Time : <span className='font-sm text-gray-400 font-light'>{item.date} | {item.hour}:{item.minutes}</span></p>
              </div>
            </div>
            <div className=' flex flex-col gap-2 md:gap-3'>
              <button className='cursor-pointer border-1 p-2 border-gray-300 rounded-md hover:bg-[#0000FF] hover:text-white transition-all font-sm duration-400'>Pay Online</button>
              <button onClick={() => handleCancel(item._id)} className='cursor-pointer border-1 p-2 border-gray-300 rounded-md hover:bg-[#0000FF] hover:text-white transition-all font-sm duration-400'>Cancel appointments</button>
            </div>

          </div>

        })
      }

    </div>
  )
}

export default MyAppointments