import React, { useState } from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { useAuthStore } from '../Zustand/useAuthStore'
import { Edit } from 'lucide-react'

const MyProfile = () => {
  const { user , sendEditData , sendingData } = useAuthStore()
  const [edit, setEdit] = useState(false)
  const [phone , setphone]= useState('');
  const [address, setaddress] = useState('');
  const [DOB , setDOB] = useState('')
  const [gender ,setgender] = useState('')
  const [img , setImg]= useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  async function HandleSubmit() {
    const formData = new FormData();
    formData.append('phone',phone);
    formData.append('address',address);
    formData.append('age',DOB);
    formData.append('gender',gender);
    if(img){ formData.append('img',img);}
    await sendEditData(formData);

  }
  return (
    <div className='relative mt-8 p-10 rounded-md shadow-md flex flex-col gap-5'>
      {/* profile pic + name  */}
      <div>
        <img className='md:w-1/6  rounded-md shadow-lg bg-[#F3F0FF]'  src={
    user?.profilePic
      ? `${apiUrl}/uploads/${user.profilePic}`
      : assets.upload_icon
  } alt="s" />
        <label className="relative inline-block md:w-1/5 my-4">
          <input
          onChange={(e)=> setImg(e.target.files[0]) }
            type="file"
            className="peer hidden"
            id="uploadFile"
            accept="image/*"
          />
          <span className="block w-full text-center py-3 px-4 text-sm rounded-md shadow-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white cursor-pointer transition hover:from-indigo-600 hover:to-blue-600">
            Choose File
          </span>
        </label>

        <h1 className=' bg-yellow-300  w-fit  p-2 rounded-md mb-2 mt-3 text-xl font-bold text-gray-600 '>{user.fullname}</h1>
        <hr />
      </div>

      <div className='  w-full flex flex-col justify-between gap-10  rounded-md my-3'>

        {/* contact info */}
        <div className='flex flex-col gap-4 justify-center '>
          <h2 className='font-bold text-xl'>Contact Information</h2>


          <p className='text-sm flex gap-10 font-bold '>Email: <span className='font-light'>{user.email}</span></p>
          <p className='text-sm flex items-center gap-10 font-bold'>Phone: {!edit ? <span className='font-light'> {user.phone}</span> : <input value={phone} onChange={(e)=> setphone(e.target.value)} className='w-full md:w-fit font-light bg-gray-300 text-black rounded-md p-1' type="text" />}</p>
          <p className='text-sm flex gap-10 font-bold '>Address: {!edit ? <span className='font-light'> {user.address}</span> : <input value={address} onChange={(e)=> setaddress(e.target.value)} className=' w-full md:w-fit font-light bg-gray-300 text-black rounded-md p-1' type="text" />}</p>

        </div>


        {/* Basic Info */}
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold text-xl'>Basic Information</h2>
          <p className='text-sm flex gap-10 font-bold '>Age:{!edit ? <span className='font-light'>{user?.age ? user.age : 'Not selected'}</span> : <input value={DOB} onChange={(e)=> setDOB(e.target.value)} type="date" />}</p>
          <p className='text-sm flex gap-10 font-bold '>Gender: {!edit ? <span className='font-light'>{user?.gender ? user.gender : 'Not selected'}</span> : <select defaultValue={gender} onChange={(e)=> setgender(e.target.value)} name="" id="" >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>}</p>
        </div>
        <h1 onClick={() =>{
          if(edit){
            HandleSubmit();
            setEdit(false)
          } else{
            setEdit(true);
          }

         }} className='p-3 border-1  border-blue-300 rounded-full hover:bg-[#5F6FFF] cursor-pointer transition-all duration-200 hover:border-none hover:text-white w-fit px-10 p'>{edit ? 'Save' : 'Edit'}</h1>


      </div>

    </div>

  )
}

export default MyProfile