import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'

const Setting = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-gray-200">
        Edit Profile
      </h1>
      <ChangeProfilePic/>
      <EditProfile/>
    </>
  )
}

export default Setting
