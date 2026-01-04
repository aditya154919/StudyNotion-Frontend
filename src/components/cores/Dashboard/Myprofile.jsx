import React from 'react'
import { useSelector } from 'react-redux'
import { FiEdit } from "react-icons/fi";

const Myprofile = () => {
  const {user} = useSelector((state)=> state.profile)
  return (
    <div className='p-2'>
      <h1 className='text-3xl mb-10 font-serif text-gray-200'>My Profile</h1>
      <div className='flex flex-row justify-between items-center rounded-md border px-12 py-7 bg-[#161D29] border-[#2C333F]'>
        <div className='flex flex-row gap-5 justify-center items-center'>
           <img src={user?.image}   className='rounded-full aspect-square w-23.5'/>
           <div className='space-y-1'>
            <h1 className='text-lg font-medium text-[#F1F2FF]'>{user.firstName +" "+ user.lastName}</h1>
            <p className='text-sm text-gray-400'>{user.email}</p>
           </div>
        </div>
        <div className='flex  felx-row font-semibold cursor-pointer items-center justify-center w-28 h-12 gap-1 bg-yellow-300 rounded-md border border-[#2C333F]'>
          Edit
          <FiEdit/>
        </div>
      </div>
      {/* About  */}
      <div className='flex flex-row justify-between items-center rounded-md border px-12 py-7 bg-[#161D29] border-[#2C333F] mt-10'>
       <div className='space-y-3'>
        <h2 className='text-xl text-gray-200 font-semibold'>About</h2>
       <p className='text-gray-500 mt-2'>{user.about}</p>
       </div>
       <div className='flex  felx-row font-semibold cursor-pointer items-center justify-center w-28 h-12 gap-1 bg-yellow-300 rounded-md border border-[#2C333F]'>
          Edit
          <FiEdit/>
        </div>
      </div>
      {/* Persnal info */}
      <div className='  flex flex-col rounded-md border px-12 py-7 bg-[#161D29] border-[#2C333F] mt-10'>
        <div className='flex flex-row w-full justify-between'>
           <h1 className='text-lg text-gray-100 font-medium'>Personal Details</h1>
          <div className='flex  felx-row font-semibold cursor-pointer items-center justify-center w-28 h-12 gap-1 bg-yellow-300 rounded-md border border-[#2C333F]'>
          Edit
          <FiEdit/>
        </div>
        </div>
        
        <div className='flex flex-row gap-50 mt-10'>
          <div className='flex flex-col gap-3'>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>FirstName</p>
              <p className='text-[#F1F2FF]'>{user.firstName}</p>
             </div>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>Email</p>
              <p className='text-[#F1F2FF]'>{user.email}</p>
             </div>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>Gender</p>
              <p className='text-[#F1F2FF]'>{user.gender}</p>
             </div>
          </div>
          <div className='flex flex-col gap-3'>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>LastName</p>
              <p className='text-[#F1F2FF]'>{user.lastName}</p>
             </div>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>Phone Number</p>
              <p className='text-[#F1F2FF]'>{user?.contactNumber || "Add Your Number"}</p>
             </div>
             <div className='flex flex-col gap-1'>
              <p className=' text-[#9298b8]'>Date of Birth</p>
              <p className='text-[#F1F2FF]'>{user.dateOfBirth || "Add yor DOB"}</p>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Myprofile
