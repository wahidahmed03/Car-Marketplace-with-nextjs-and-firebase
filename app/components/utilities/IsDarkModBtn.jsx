"use client"

import React, { useEffect, useState } from 'react'
import { AiFillMoon,AiFillSun } from "react-icons/ai";


function IsDarkModBtn() {
  const [IsDarkMod,setIsDarkMod] = useState(false)




const ModeFunc =()=>{
  if(document.documentElement.classList.value == "dark"){
    document.documentElement.classList.remove("dark");
    setIsDarkMod(false)
  }else{
    document.documentElement.classList.add("dark");
    setIsDarkMod(true)
  }
}

  return (
    <div onClick={ModeFunc} className='h-[35px] w-[35px] bg-gray-200 flex items-center justify-center rounded cursor-pointer  dark:bg-gray-800 text-black dark:text-white text-2xl'>
      {IsDarkMod ? <AiFillSun /> :  <AiFillMoon size={23} />}
    </div>
  )
}

export default IsDarkModBtn