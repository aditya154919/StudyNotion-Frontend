import React from 'react'
import ContactDetails from '../components/cores/ContactPage/ContactDetails'
import ContactUs from '../components/cores/ContactPage/ContactUs'

const Contact = () => {
  return (
    <div>
      <div className='mx-auto mt-20 flex w-11/12 max-w-260 flex-col justify-between gap-10 text-white lg:flex-row'>
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
