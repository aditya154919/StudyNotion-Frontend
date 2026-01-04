import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import  "./App.css"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './Common/Navbar'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/verify'
import Myprofile from './components/cores/Dashboard/Myprofile'
import ProtectedRoute from './components/cores/Authentication/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { ACCOUNT_TYPE } from './utils/constant'
import AddCourse from './components/cores/AddCourse'
import { useSelector } from 'react-redux'
import MyCourses from './components/cores/AddCourse/MyCourses/MyCourses'
import Catalog from './pages/Catalog'
import Edit from './components/cores/AddCourse/EditCourse/Edit'
import CourseDetils from './pages/CourseDetils'
import EnrolledCourses from './pages/EnrolledCourses'
import Error from './pages/Error'
import ViewCourse from './pages/ViewCourse'
import VideoDetailsSideBar from './components/cores/ViewCourses/VideoDetailsSideBar'
import Vediodetails from './components/cores/ViewCourses/vediodetails'
import About from './pages/About'
import Instructor from './components/cores/InstructorDashboard/Instructor'
import Contact from './pages/Contact'
import ForgotPass from './pages/ForgotPass'
import VerifyOtp from './pages/VerifyOtp'
import ChangePass from './pages/ChangePass'
import Setting from './components/cores/Dashboard/Settings/Setting'



const App = () => {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className='w-screen min-h-screen bg-[#000814] flex flex-col font-inter'>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/verifyemail' element={<VerifyEmail/>}/>
         <Route path='/verify/:token' element={<Verify/>}/>
         <Route path='catalog/:catlogName' element={<Catalog/>}/>
         <Route path='/course/:courseId' element={<CourseDetils/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/forgot-password' element={<ForgotPass/>}/>
         <Route path='/verifyOtp/:email' element={<VerifyOtp/>}/>
         <Route path='/change-pass/:email' element={<ChangePass/>}/>

         <Route element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
         }>

          <Route path='/dashboard/myprofile' element={<Myprofile/>}/>
          <Route path='/dashboard/instructor' element={<Instructor/>}/>
          <Route path='/dashboard/settings' element={<Setting/>}/>

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path='/dashboard/addcourse' element={<AddCourse/>}/>
              <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='/dashboard/edit-course/:courseId' element={<Edit/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
              
              </>
            )
          }
          

         </Route>

         <Route
         element={
          <ProtectedRoute>
            <ViewCourse/>
          </ProtectedRoute>
         }
         >
           {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path='viewCourse/:courseId/section/:sectionId/subSection/:subSectionId' element={<Vediodetails/>}/>
              </>
            )
           }
         </Route>

         <Route path='*' element={<Error/>}/>
         
      </Routes>
    </div>
  )
}
export default App

