import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyAppointments from './Pages/MyAppointments'
import MyProfile from './Pages/MyProfile'
import Appointments from './Pages/Appointments'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import DocProfile from './Pages/DocProfile'
import Signup from './Pages/Signup'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from './Zustand/useAuthStore'
import { LoaderCircle } from 'lucide-react';
import Admin from './Pages/Admin'

const App = () => {
  const {user, getProfile , checking} = useAuthStore()

  useEffect(() => {
  getProfile(); // fetch profile on mount
}, [getProfile]);

  return (
    <div className=' mx-4 sm:mx-[10%]'>
      <Toaster position="top-center" />
      <Navbar />

      {checking && <div className='fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-100'>
        <LoaderCircle className='animate-spin' size={50} color='black' />
      </div>}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/All-Doctors' element={<Doctors />} />
          <Route path='/All-Doctors/:speciality' element={<Doctors />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/My-Appointments' element={user?.verified == 'true' ? <MyAppointments /> : <Login />} />
          <Route path='/My-Profile' element={ user?.verified  == 'true'  ? <MyProfile /> : <Login />} />
          <Route path='/login' element={user?.verified == 'true' ? <Home /> : <Login />} />
          <Route path='/signup' element={user?.verified == 'true' ? <Home /> : <Signup />} />
          <Route path='/appointments/:docID' element={<DocProfile />} />
          <Route path='/admin' element={user?.verified == 'true' ? <Home /> : <Admin />} />
        </Routes>
      
        <Footer/>
    </div>
  )
}

export default App