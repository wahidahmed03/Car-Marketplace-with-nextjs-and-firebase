import React from 'react'
import ivo from '../../../public/CarType/suvDark.png'
import Image from 'next/image'

import CarTypeData from "./../HeroUtilities/CartType.json"

function BrouseTypeCom() {


  return (
 <div className='  px-10 py-20  flex gap-2 flex-col text-black dark:text-white'>
    < p className=' text-2xl text-center py-5 pt-10  font-bold '>Browse By Type    </p>
<div className=' flex gap-2 items-center justify-center flex-wrap'>
{
    CarTypeData.map((CarItem)=>{ 
        return(
            <div className="w-[130px] h-[90px] border-[3px]  hover:shadow-lg dark:hover:shadow-lg dark:cursor-pointer dark:border flex flex-col  items-center justify-center  gap-2 rounded-lg">
    <p className=' text-xl font-semibold'>{CarItem.name}</p>
    <img src={CarItem.LightIcon} alt={CarItem.name} width={30} height={30} />
    </div>) })
}
</div>
</div>
)
}

export default BrouseTypeCom