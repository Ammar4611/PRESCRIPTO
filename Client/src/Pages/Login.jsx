import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Zustand/useAuthStore';
import { LoaderCircle, Shield, Verified } from 'lucide-react';
import toast from 'react-hot-toast';
const Login = () => {

  const {login,user, isLogedInUnverified , checking ,  verifyOTP, resendOTP}= useAuthStore()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState('');
  

  async function HandleSubmit(e) {
    e.preventDefault();
    const userData = { email, password, }
    setEmail("");
    setPassword("");
    await login(userData)

  }

  async function ResendOTP(e) {
    e.preventDefault();
   const response = await resendOTP()
    if(response && response.success){
      toast.success('OTP resent successfully! Please check your email.');
    }else{
      toast.error('Could not resend OTP. Please try again later.');
    }
  }

  async function HandleOTPSubmit(e) {
    e.preventDefault();
    const OTPdata= otp;
    const response = await verifyOTP(OTPdata);
    if (response && response.success) {
      toast.success('Email verified successfully!');
    }else{
      toast.error('Invalid OTP. Please try again.');
    }

    
  }

  
  return (
    <div className='flex justify-center w-full my-10 md:my-0 p-2 md:p-20'>
      <div className=' text-gray-700 shadow-lg border-1 md:w-1/2 flex flex-col border-gray-300 rounded-md p-5 md:p-10 gap-5'>
        <div>
          <h1 className='text-xl text-gray-700 font-bold'>Login</h1>
          <p className='text-sm text-gray-700'>Please log in to book appointment</p>
        </div>
        <form className='flex flex-col gap-5'>
          <label className='flex flex-col gap-1'>
            <p>Email</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-1 border-gray-300 rounded-md  px-3 py-2' type="email" placeholder='Enter Email' />
          </label>
          <label>
            <p>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border-1 border-gray-300 rounded-md  px-3 py-2' type="password" placeholder='Enter Password' />
          </label>
          <button onClick={HandleSubmit} className='bg-[#5F6FFF] text-white p-3 rounded-md '>Login</button>
        </form>
        <p>Create an new account?    <Link to={'/signup'} className='text-blue-400'>  Click here</Link></p>

      </div>

      { user?.verified == 'false' ?
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className=" flex flex-col justify-center items-center text-center bg-white text-gray-700 shadow-lg w-1/2 flex flex-col border border-gray-300 rounded-md p-10 gap-5">
      <div className='flex gap-4 flex-col justify-center items-center'>
         <Shield  className='text-blue-800  w-23 h-23 mb-2'/>
         <h1 className='text-2xl'>Verification</h1>
         <p className='text-sm'>You will get OTP via email</p>
   </div>
   <form className='flex flex-col gap-3' >
    <input value={otp} onChange={(e)=> setOtp(e.target.value) }   className='px-4 py-2 border-gray-500 border-1 rounded-md' type="text" placeholder='Enter OTP here' />
    {/* <input value={email} onChange={(e)=> setEmail(e.target.value) }   className='px-4 py-2 border-gray-500 border-1 rounded-md' type="email"  placeholder='Enter Email' /> */}
    <button onClick={HandleOTPSubmit} className='flex justify-center items-center cursor-pointer px-4 py-2 border-gray-500 border-1 rounded-md bg-[#482397] text-white'>{checking ? <LoaderCircle className=' animate-spin w-5 h-5' /> : "Verify"}</button>
    <p className='flex justify-center items-center text-center '>Didn't get OTP? <span onClick={ResendOTP} className=' text-blue-400 cursor-pointer  pl-2'>{checking ? <LoaderCircle className=' animate-spin w-5 h-5' /> : "Resend"}</span> </p>
   </form>
    </div>
  </div> :""

      }
    </div>
  )
}

export default Login