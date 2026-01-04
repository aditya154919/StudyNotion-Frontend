import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { verifyemail } from '../Services/operations/Authapi';

const Verify = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() =>{
    if(token){
      dispatch(verifyemail(token,navigate));
      setStatus("VERIFIED SUCCESS ")
    }

  },[token])

  

  return (
    <div className="relative w-full h-190 bg-gray-900 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-400 p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-200">{status}</h2>
        </div>
      </div>
    </div>
  )
}

export default Verify
