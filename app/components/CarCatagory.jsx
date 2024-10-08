import React from 'react'
import BrouseTypeCom from './HeroUtilities/BrouseTypeCom'

function CarCatagory() {
  return (
    <div className=' h-[650px] sm:h-[450px] lg:h-[350px] w-full dark:bg-gray-900'>
        <div className="w-full h-full dark:bg-gray-800/40 flex items-center justify-center py-5 pt-10 text-black dark:text-white">
        <BrouseTypeCom />
        </div>
    </div>
  )
}

export default CarCatagory