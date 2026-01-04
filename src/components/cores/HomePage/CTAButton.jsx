import React from 'react'
import { Link } from 'react-router'

const CTAButton = ({children,active,linkto}) => {
  return (
   <Link to={linkto} className={`text-center text-[15px] px-6 py-3 rounded-md font-bold ${active ? "bg-[#FFD60A] text-black":"bg-[#161D29] text-white"}
   hover:scale-95 transition-all duration-100 border-r-2  border-b-2 border-[#5c5f69] hover:border-0
   `}>
   {children}
   </Link>
  )
} 

export default CTAButton
