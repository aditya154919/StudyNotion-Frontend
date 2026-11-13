import React from 'react'

const Quote = () => {
  return (
    <blockquote className="mx-auto px-1 py-2 text-center text-lg font-semibold leading-relaxed text-white sm:px-6 sm:text-xl md:text-2xl">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <span className='bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>combines technology</span>
        <span className="bg-linear-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-linear-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </blockquote>
  )
}

export default Quote
