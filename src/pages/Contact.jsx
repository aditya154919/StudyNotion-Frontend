import React from 'react'
import ContactDetails from '../components/cores/ContactPage/ContactDetails'
import ContactUs from '../components/cores/ContactPage/ContactUs'

const Contact = () => {
  return (
    <div>
      <div className='mx-auto mt-10 flex w-11/12 max-w-260 flex-col justify-between gap-8 pb-10 text-white sm:mt-14 lg:mt-20 lg:flex-row lg:gap-10'>
        <div className='lg:w-[40%]'>
          <ContactDetails/>
        </div>
        <div className='lg:w-[60%]'>
            <ContactUs/>
        </div>
      </div>
    </div>
  )
}

export default Contact
