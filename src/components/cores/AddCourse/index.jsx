import React from 'react'
import Section from './Section'

const AddCourse = () => {
  return (
    <div className='flex items-start gap-x-2 w-full justify-between '>
        <div className='felx flex-col gap-5 w-[55%]'>
            <div className='p-5'>
                <h1 className='text-gray-100 font-mono text-3xl'>Add course</h1>
            </div>
            <div className=''>
                <Section/>
            </div>
        </div>
        {/* INformation */}
        <div className="sticky top-10 hidden max-w-100 flex-1 rounded-md border border-[#2C333F] bg-[#161D29] p-6 xl:block">
          <p className="mb-8 text-lg text-[#F1F2FF]">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-[#F1F2FF]">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
            
    </div>
  )
}

export default AddCourse
