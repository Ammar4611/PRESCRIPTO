import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Zustand/useAuthStore';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Shield } from 'lucide-react';



const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
const { signup, user, checking, error, verifyOTP, resendOTP } = useAuthStore();

  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const nevigate = useNavigate()

  async function HandleOTPSubmit(e) {
    e.preventDefault();
    const OTPdata= otp;
    const response = await verifyOTP(OTPdata);
    if (response && response.success) {
      setShowOtp(false);
      toast.success('Email verified successfully!');
      nevigate('/About');
    }else{
      toast.error('Invalid OTP. Please try again.');
    }

    
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

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = { fullname, email, password }
   

    const response = await signup(userData);
     setFullname('');
    setEmail('');
    setPassword('');
    if (response && response.success) {
      setShowOtp(true);
      toast.success('Account created successfully! Please verify your email.');
    }
  }

  useEffect(() => {
    async function checkErrors() {
      if (Array.isArray(error)) {
        const nameError = error.find((err) => err.path === "fullname");
        const emailErr = error.find((err) => err.path === "email");
        const passErr = error.find((err) => err.path === "password");
        setFullnameError(nameError ? nameError.msg : "");
        setEmailError(emailErr ? emailErr.msg : "");
        setPasswordError(passErr ? passErr.msg : "");
        if (!nameError && !emailErr && !passErr) {
          setFullnameError("");
          setEmailError("");
          setPasswordError("");
          toast.error(error[0].msg);
        }
      }
    }
    checkErrors();
  }, [signup, checking])

  return (
    <div className='flex justify-center w-full py-10 md:py-0 md:p-2 md:pt-10 relative'>
      <div className=' text-gray-700 shadow-lg border-1 md:w-1/2 flex flex-col border-gray-300 rounded-md p-5 md:p-10 gap-5'>
        <div>
          <h1 className='text-xl text-gray-700 font-bold'>Create Account</h1>
          <p className='text-sm text-gray-700'>Please sign up to book appointment
          </p>
        </div>
        <form className='flex flex-col gap-3'>
          <label className='flex flex-col gap-1'>
            <p>Full name</p>
            <input value={fullname} onChange={(e) => setFullname(e.target.value)} className='w-full border-1 border-gray-300 rounded-md  px-3 py-2' type="text" placeholder='Enter full name' />
            <p className='text-[10px] text-red-400'>{fullnameError ? fullnameError : ''}</p>
          </label>
          <label className='flex flex-col gap-1'>
            <p>Email</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border-1 border-gray-300 rounded-md  px-3 py-2' type="email" placeholder='Enter Email' />
            <p className='text-[10px] text-red-400'>{emailError ? emailError : ''}</p>
          </label>
          <label>
            <p>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border-1 border-gray-300 rounded-md  px-3 py-2' type="password" placeholder='Enter Password' />
            <p className='text-[10px] text-red-400'>{passwordError ? passwordError : ''}</p>
          </label>
          <button onClick={handleSubmit} className='text-center flex justify-center items-center cursor-pointer bg-[#5F6FFF] text-white p-3 rounded-md '>{checking ? <LoaderCircle className=' animate-spin w-5 h-5' /> : 'Create Account'}</button>
        </form>
        <p>Already have an account?    <Link to={'/login'} className='text-blue-400'>  Click here</Link></p>

      </div>


      {/* OTP VERFICATION  */}
  {showOtp && (
  <div className="fixed  inset-0 bg-black/50 flex items-center justify-center">
    <div className=" flex flex-col justify-center items-center text-center bg-white text-gray-700 shadow-lg  md:w-1/2 flex flex-col border border-gray-300 rounded-md h-full md:h-fit p-10 gap-5">
      <div className='flex gap-4  flex-col justify-center items-center'>
         <Shield  className='text-blue-800  w-23 h-23 mb-2'/>
         <h1 className='text-2xl'>Verification</h1>
         <p className='text-sm'>You will get OTP via email</p>
   </div>
   <form className='flex flex-col gap-3' >
    <input value={otp} onChange={(e)=> setOtp(e.target.value) } className='px-4 py-2 border-gray-500 border-1 rounded-md' type="text" placeholder='Enter OTP here' />
    <button onClick={HandleOTPSubmit} className='cursor-pointer px-4 py-2 border-gray-500 border-1 flex justify-center items-center text-center rounded-md bg-[#482397] text-white'>{checking ? <LoaderCircle className=' text-center animate-spin w-5 h-5' /> : "Verify"}</button>
    <p className='flex justify-center items-center text-center '>Didn't get OTP? <span onClick={ResendOTP} className=' text-blue-400 cursor-pointer  pl-2'>{checking ? <LoaderCircle className=' animate-spin w-5 h-5' /> : "Resend"}</span> </p>
   </form>
    </div>
  </div>
)}
    </div>
  )
}

export default Signup