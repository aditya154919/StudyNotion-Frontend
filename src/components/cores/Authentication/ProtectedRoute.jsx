import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate()

    if(user != null){
        return children
    }
    else{
      return  <Navigate to={"/login"}/>
    }
  
}

export default ProtectedRoute
