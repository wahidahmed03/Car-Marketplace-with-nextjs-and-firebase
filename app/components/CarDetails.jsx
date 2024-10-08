import Link from 'next/link';
import React from 'react'

import { BsFuelPump } from "react-icons/bs";
import { IoMdSpeedometer } from "react-icons/io";
import { TbManualGearbox,TbExternalLink,   } from "react-icons/tb";





function CarDetails({car}) {
  const CarData = car || ""
  return (
    <div className=' w-[300px] h-[370px]  overflow-hidden rounded border-[3px] dark:border-gray-600 dark:border-[3px] cursor-pointer'>
        <div className="w-full h-[180px] overflow-hidden object-none object-center">
            <img className=" object-contain object-center" src={CarData.image} alt={CarData.model?CarData.model:""} />
        </div>
    <div className="">
        <h2 className='w-full h-[60px] text-2xl  border-b-[2px] p-2 pt-3 font-semibold uppercase '>{CarData.model?CarData.model:""}</h2>
    </div>
    <div className=" flex gap-4 w-full items-center justify-center">
        <div className="w-[33%] h-[70px] flex gap-1 flex-col items-center justify-center pl-1">
          < BsFuelPump size={18} />
          <p className=' text-[14px] font-light'>{CarData.fuelEfficiencyhighway? truncateText(CarData.fuelEfficiencyhighway, 20)  :""} </p>
        </div>

        <div className="w-[33%] h-[70px] p-2 flex gap-1 flex-col items-center justify-center ">
          < IoMdSpeedometer size={18} />
          <p className=' text-[14px] font-light'>{CarData.fuelType? truncateText(CarData.fuelType,20):""}</p>
        </div>

        <div className="w-[33%] h-[70px] p-2 flex gap-1 flex-col items-center justify-center">
          < TbManualGearbox  size={18} />
          <p className=' text-[14px] font-light'>{CarData.transmission?CarData.transmission:""}</p>
        </div>
    </div>
    <div className="border-t-[2px] flex justify-between px-3" >
        <h5 className=' text-2xl font-medium  px-1 py-1'>${CarData.price?CarData.price :"" }</h5>
        <Link href={`/CarViews/${CarData.id}`} className=' text-1xl flex gap-2 items-center justify-center text-blue-500' >View Details <TbExternalLink size={20} /> </Link>
    </div>
    </div>
  )
}

export default CarDetails



const truncateText = (text, wordLimit) => {
  return text.slice(0, wordLimit)
};