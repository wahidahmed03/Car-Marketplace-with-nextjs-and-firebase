"use client"
import Link from 'next/link';
import React, {useEffect ,useState } from 'react'
import { useParams } from 'next/navigation'


import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCar } from "react-icons/ai";

import LoadingPage from '@/app/components/LodingPage';

// FIREBASE
import app from "@/app/firebase"
import { doc,getDoc,getFirestore  } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(app);


const Futures  = ["Future1","future2","furetute3","Future1","future2","furetute3","Future1","future2","furetute3"]

function page() {
   const [CarData, setCarData] = useState({});
   const [CarFuture, setCarFuture] = useState(null);
   const [pageLoading,setpageLoading ]= useState(true)

   const params = useParams();
   const CarId = params.id;

   useEffect(() => {
      if (CarData.features) {
         const carFutureTo = CarData.features.split(",");
         setCarFuture(carFutureTo);
      }
   }, [CarData]);
   
   useEffect(() => {
      UserAllInformationData();
   }, []);
   
   const UserAllInformationData = async () => {
      try {
         const q = query(collection(db, "/CarMarketplaceUser/cars/carsdata/"), where("id", "==", `${CarId}`));
         const querySnapshot = await getDocs(q);
         
         querySnapshot.forEach((doc) => {
            setCarData(doc.data());
         });
         setpageLoading(false)
      } catch (error) {
         console.error("Error fetching user car data:", error);
      }
   };

 
return (
   <>
    <div className=' bg-gray-50 dark:bg-gray-900 text-black dark:text-white py-10 px-20'>
        <div className="">
            <h2 className='text-4xl font-semibold'>{CarData.model}</h2>
            <p>{CarData.brand}</p>
            <div className=" flex flex-wrap gap-2 font-semibold text-blue-600 dark:text-white">
                <div className=" w-[70px] h-[32px] bg-blue-500/30 border-[2px] border-blue-600 rounded-xl flex items-center justify-center">Time</div>
                <div className=" w-[70px] h-[32px] bg-blue-500/30 border-[2px] border-blue-600 rounded-xl flex items-center justify-center">Time</div>
                <div className=" w-[70px] h-[32px] bg-blue-500/30 border-[2px] border-blue-600 rounded-xl flex items-center justify-center">Time</div>
                <div className=" w-[70px] h-[32px] bg-blue-500/30 border-[2px] border-blue-600 rounded-xl flex items-center justify-center">Time</div>
            </div>
        </div>
        <div className=" flex gap-5 flex-col lg:flex-row">
            <div className=" flex  flex-col  gap-5">
                <div className=" py-5 shadow-xl px-3 rounded w-[850px]  mt-2 dark:bg-gray-800/50 bg-gray-100/50 ">
                    <img className='w-[830px] h-[500px]  rounded-2xl object-cover shadow-lg ' src={CarData.image} alt={CarData.model} />
                    <div className=" flex  gap-1  py-2">
                     <img className='w-[200px] h-[120px] shadow rounded-2xl object-cover' src={CarData.image} alt={CarData.model} />
                     <img className='w-[200px] h-[120px] shadow rounded-2xl object-cover' src={CarData.image} alt={CarData.model} />
                     <img className='w-[200px] h-[120px] shadow rounded-2xl object-cover' src={CarData.image} alt={CarData.model} />
                    </div>
                </div>
                <div className=" flex  flex-wrap gap-2">
                    <div className=" py-10 px-5 min-w-[100%]   bg-gray-100 dark:bg-gray-900  rounded shadow-lg drop-shadow-md max-w-[850px] border-[2px] dark:border-gray-700">
                        <p className='text-2xl py-3 font-bold'>Driscription</p>
                        <p>{CarData.discription}</p>
                    </div>

                    <div className=" min-w-[100%] py-8 px-5 bg-gray-100 dark:bg-gray-900 rounded shadow-lg drop-shadow-md max-w-[850px] border-[2px] dark:border-gray-700 ">
                        <p className='text-2xl py-3 font-bold'>Future</p>
                        <div className=" flex gap-10 flex-wrap-reverse  order-first	">
                        {CarFuture && Array.isArray(CarFuture) ? CarFuture.map((future, index) => (
                           <div key={index} className="flex items-center gap-1 text-xl">
                              <AiFillCheckCircle className='text-blue-500' /> {future}
                           </div>
                           )) : ""}

                        </div>
                    </div>
                </div>
            </div>



            <div className="">
                <div className="w-full lg:w-[500px] h-[200px] bg-gray-100 drop-shadow-lg dark:bg-gray-800	 py-5 px-5 rounded mt-2">
                    <p className=' text-lg'>OUR PRICE</p>
                    <h5 className=' text-6xl font-semibold ' >${CarData.price}</h5>
                    <div className=" w-full h-[40px]  rounded text-center flex items-center justify-center text-white font-medium my-3 bg-blue-500">
                       <Link className='' href={"/"} >Buy Car</Link>
                    </div>
                </div>


                <div className=" h-[900px] bg-gray-100 drop-shadow-lg dark:bg-gray-800	 py-5 px-5 rounded mt-2">
                    <p className=' text-lg text-center pb-5'>Specifications</p>
                    <div className=" px-5 flex gap-5 flex-col text-xl">

                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                             Category
                           </div>
                            BMW
                        </div>


                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Condition
                           </div>
                           {CarData.condition}
                        </div>

                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Make
                           </div>
                           {CarData.make}
                        </div>

                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Model
                           </div>
                          {CarData.model}
                        </div>

                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Year
                           </div>
                           {CarData.year}
                        </div>


                        
                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Drive Type
                           </div>
                           {CarData.driveType}
                        </div>



                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Transmission
                           </div>
                           {CarData.transmission}
                        </div>




                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Fuel Type
                           </div>
                           {CarData.fuelType}
                        </div>




                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Mileage
                           </div>
                           {CarData.fuelEfficiencyCity}
                        </div>




                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Engine Size
                           </div>
                           {CarData.engineSize}
                        </div>




                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Cylinder
                           </div>
                           {CarData.cylinder}
                        </div>

                        
                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800  dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Color
                           </div>
                           {CarData.color}
                        </div>



                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Door
                           </div>
                           {CarData.door}
                        </div>

                        <div className=" flex justify-between">
                           <div className=" flex gap-2 items-center ">
                              <div className="py-1 px-1 rounded-full bg-blue-500/40 border border-blue-500 text-blue-800 dark:text-white">
                                <AiFillCar size={15} />
                              </div>
                              Year
                           </div>
                           {CarData.year}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    {pageLoading ? <LoadingPage />:""}
   </>
  )
}

export default page