import React from 'react'
import SchearCom from './HeroUtilities/SchearCom'
import Image from 'next/image'

import imgpath from "./../../public/tesla.png"

function HeroSection() {
return (
<>
 <div className=" w-[98.90vw] bg-blue-100/50 dark:bg-gray-900 text-black dark:text-white h-[85vh] sm:h-[70vh] lg:h-[85vh] ">
    <div className=" flex flex-col items-center justify-center pt-28">
        <div className=" flex flex-col items-center justify-center gap-2 ">
            <p className='px-5 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque ad vel quibusdam aliquam amet rerum?</p>
            <h5 className=' text-4xl sm:text-5xl font-semibold'>FIND YOUR DREAM CAR</h5>
        </div>
        <div className="pt-5">
            <SchearCom />
        </div>
        <div className="mt-52 sm:mt-20 md:mt-10">
            <Image src={imgpath} width={1400} height={1400} alt={"car image"} />
        </div>
    </div>
 </div>
</>
)
}

export default HeroSection