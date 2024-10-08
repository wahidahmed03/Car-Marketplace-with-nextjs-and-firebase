import React from 'react'
import { AiFillMoon } from "react-icons/ai";
import { TbPlus } from "react-icons/tb";



function AddListing() {
  return (
    <div className='h-[35px] w-[35px] bg-gray-200  dark:bg-gray-800  flex items-center justify-center rounded cursor-pointer '>
    <TbPlus size={23} />
  </div>
  )
}

export default AddListing