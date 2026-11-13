import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/cores/Dashboard/Sidebar';
import { Outlet } from 'react-router';
import Footer from '../components/cores/HomePage/Footer';

const Dashboard = () => {
    const {loading:profileLoading} =  useSelector((state)=>state.profile);
    const{loading:authLoading} = useSelector((state)=>state.auth)

    if(profileLoading || authLoading){
        return(
            <div className='grid min-h-[calc(100vh_-_3.5rem)] place-items-center'>
              <div className='spinner'></div>
            </div>
        )
    }
  return (
    <>
    <div className='relative flex min-h-[calc(100vh_-_3.5rem)] min-w-0 flex-col md:flex-row'>
        <Sidebar/>
        <div className='min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto'>
           <div className='mx-auto w-full max-w-250 px-4 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-24 lg:w-11/12 lg:py-10 lg:pb-10'>
             <Outlet/>
           </div>
        </div>
        
    </div>

    <Footer/>
    </>

  )
}

export default Dashboard
