import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineing from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully cummited to success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibity",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    },
    
]
const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-5 items-center'>
        {/* left */}
         <div className='flex flex-col w-[45%] gap-5'>
           {
            timeline.map((element,index)=>{
                return(
                    <div>
                    <div className='flex flex-row gap-6' key={index}>
                        <div className='w-13 h-13 bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                            <img src={element.Logo}/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold text-[18px] '>{element.heading}</h2>
                            <p className='text-base'>{element.Description}</p>
                        </div>
                    </div>
                    <div className='hidden lg:block  h-14 border-dotted border-r border-[#AFB2BF] bg-[#6E727F\0] w-6.5'></div>
                    </div>
                    
                )
            })
           }
         </div>
         {/* right */}
        <div className='relative shadow-[#00b5f1] shadow-[0px_0px_30px_0px] w-fit h-fit'>
          <img src={timelineing} className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-100 lg:h-fit'/>
          <div className='absolute flex flex-row text-white uppercase py-7 px-19 bg-[#014A32] left-[50%] translate-x-[-50%] translate-y-[-54%]'>
            <div className='flex flex-row gap-9 items-center justify-between border-r border-[#05A77B] px-8'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-sm text-[#05A77B]'>Years of Experience</p>
            </div>
            <div className='flex flex-row gap-5 items-center px-8'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-sm text-[#05A77B] w-18.75'>Types of courses</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
