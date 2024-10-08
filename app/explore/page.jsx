 "use client"
import React, { useState ,useEffect} from 'react';
import CarDetails from '../components/CarDetails'
import FilterSearchComponents from '../components/ExploreComponents/FilterSearchComponents'
import LoadingPage from '../components/LodingPage';




function page() {
  const [UserCarsData, setUserCarsData] = useState([]); 
  const [IsPageLoading,setIsPageLoading] = useState(true)
   const GetFilterCarsData= (carsdata)=>{
    if(carsdata) setUserCarsData(carsdata)
      if(carsdata) setIsPageLoading(false)
   }


return (
<>
 <div className="flex bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-400 ">
  <div className="w-[374px] h-screen  hidden sm:block">
   <div className=" fixed bg-gray-100 dark:bg-slate-800 w-[300px] h-[101vh] py-16 px-5 -mt-14 -z-0">
    <FilterSearchComponents   GetFilterCarsData={GetFilterCarsData} />
   </div>
  </div>
  <div className=" w-full min-h-screen  bg-slate-100 dark:bg-gray-900">
   <div className="">
    <div className="">
      <div className="w-full  bg-gray-100 shadow-lg">
        <img  className='w-full h-[150px] object-center object-cover' src="https://d9s1543upwp3n.cloudfront.net/wp-content/uploads/2023/04/AI-generated-car-design-scaled.jpeg" alt="bg" />
      </div>
      <div className=" relative ">
       <div className=" py-5">
        <div className="flex gap-2 items-center justify-center flex-wrap ">
        {UserCarsData.map((car, index) => (
        <CarDetails key={index} car={car} />
        ))}
        </div>
        </div>
      </div>
    </div>
   </div>
  </div>
 </div>
 {IsPageLoading? <LoadingPage /> : ""  }
</>
)
}

export default page