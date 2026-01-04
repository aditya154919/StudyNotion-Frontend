import React from 'react'
import ContactForm from './ContactForm'

const ContactUs = () => {
  return (
    <div className='border border-[#424854] text-[#838894] rounded-xl p-4 lg:p-5 flex gap-3 flex-col'>
       <h1 className='text-3xl leading-10 font-semibold text-gray-200'>
        Got a Idea? We&apos;ve got the skills.<br></br>
        Let&apos;s team up
       </h1>
       <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div className='mt-4'>
       <ContactForm/>
      </div>
    </div>
  )
}

export default ContactUs
