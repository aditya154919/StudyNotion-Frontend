import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import { Link, useNavigate } from 'react-router'
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from '../../../Services/operations/Authapi';


const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user} = useSelector((state) =>state.profile)
  const [open,setOpen] = useState(false)
  return (
    <button className='relative cursor-pointer' onClick={()=>setOpen(!open)}>
      <div className='flex flex-row items-center justify-center gap-x-1'>
        <img
        src={user?.image}
        alt='hello'
        className='aspect-square w-7.5 rounded-full object-cover'
        />
        <AiOutlineCaretDown className="text-center text-lg text-[#AFB2BF]" />
      </div>
      {
        open && (
          <div className='absolute  top-[128%] right-0 z-1000 divide-y-2 divide-[#2C333F] overflow-hidden rounded-md border border-[#2C333F] bg-[#161D29]'>
            <Link to={"/dashboard/myprofile"} onClick={()=>setOpen(!open)}
            className='text-md font-semibold text-gray-400 px-2 py-1.5 flex flex-row gap-x-1 items-center justify-center'
            >
              <VscDashboard/>
            Dashbord</Link>

            <div onClick={()=>{setOpen(!open)
             dispatch(logout(navigate))}}
            className=' font-semibold text-gray-400 px-2 py-1.5 flex flex-row gap-x-1 items-center justify-start'
            >
              <VscSignOut/>
            Logout</div>

          </div>
        )
      }
    </button>
  )
}

export default ProfileDropdown
