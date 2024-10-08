"use client"
import React,{useEffect ,useState } from 'react'
import CarDetails from './CarDetails'
import Link from 'next/link'
import { GiCityCar } from "react-icons/gi";
import LoadingPage from './LodingPage';

// FIREBASE
import app from "@/app/firebase"
import { collection, query, where, getDocs, doc,getDoc,getFirestore  } from "firebase/firestore"; 
const db = getFirestore(app);




function HomeCarDisplay() {
  const [UserCarsData, setUserCarsData] = useState([]); 
  const [isLoading, setisLoading ] =  useState(true)


  useEffect(() => {
      UserAllInformationData()
   }, [])
   
   const UserAllInformationData  = async ()=>{
    try {
      const querySnapshot = await getDocs(collection(db, "/CarMarketplaceUser/cars/carsdata/"));

      const carsDataArray = [];
      querySnapshot.forEach((doc) => {
        carsDataArray.push(doc.data());
        setisLoading(false)
      });
      setUserCarsData(carsDataArray);
    } catch (error) {
      console.error("Error fetching user car data:", error);
    }
   }
  



  return (
    <>
    <div className=' w-full  dark:bg-gray-900 text-black dark:text-white '>
      <div className=" flex  flex-col items-center justify-center dark:bg-gray-800/40 pb-20">

      <div className="p-10">
        <h5 className='text-5xl'>Most Searched Cars  </h5>
      </div>
      <div className="flex gap-2 items-center justify-center flex-wrap ">
      {UserCarsData.map((car, index) => (
          <CarDetails key={index} car={car} />
        ))}

      </div>
      <Link href={'/explore'} className=' flex items-center justify-center  gap-2 py-2 px-8 border-[3px]  mt-7  hover:border-blue-500 hover:bg-blue-500/50 transition-all duration-300'  >Explore Cars <GiCityCar size={35} /> </Link>
      </div>
    </div>
    { isLoading? <LoadingPage /> :"" }
    </>
  )
}
 
export default HomeCarDisplay