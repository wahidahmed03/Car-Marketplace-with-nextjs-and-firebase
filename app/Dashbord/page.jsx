"use client"
import React, {useState,useEffect } from 'react'
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";   // ICON IMPORT  
import { useRouter } from 'next/navigation' 
import CarDetails from '../components/CarDetails'
import DashBordProfile from '../components/utilities/DashBordProfile'
import LoadingPage from '../components/LodingPage';




// FIREBASE
import app from "@/app/firebase"
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { doc,getDoc,getFirestore ,collection, query, where, getDocs  } from "firebase/firestore"; 

const db = getFirestore(app);


function page() {
  const [IseUserDetailsProfile,setIseUserDetailsProfile] = useState(false)
  const[LogingUserEmail,setLogingUserEmail]= useState(null)
  const [UserData,setUserData]= useState( " ")
  const [UserCarsData, setUserCarsData] = useState([]); 
  const [isPageLoading,setisPageLoading ] = useState(true)
  const router = useRouter()



  
useEffect(  () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(!user) router.push('/Singin')
   if(user) setLogingUserEmail(user.email)
  if(user)setisPageLoading(false)
});
 }, [])

 useEffect(() => {
  if(LogingUserEmail){
    UserAllInformationData()
    UserAllCarListingData()
  }
 }, [LogingUserEmail])
 
 const UserAllInformationData  = async ()=>{
    const docRef = doc(db, "/CarMarketplaceUser/", `${LogingUserEmail}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data())
    } else {
    }
 }


const UserAllCarListingData = async () => {
  try {
    const q = query(collection(db, "/CarMarketplaceUser/cars/carsdata/"), where("OwnerEmail", "==", `${LogingUserEmail}`));
    const querySnapshot = await getDocs(q);

    const carsDataArray = [];
    querySnapshot.forEach((doc) => {
      carsDataArray.push(doc.data());
    });

    setUserCarsData(carsDataArray);
  } catch (error) {
    console.error("Error fetching user car data:", error);
  }
};





return (
<>
 <div className="flex bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-400 ">
  <div className="w-[374px] h-screen hidden sm:block">
    <div className=" fixed bg-gray-100 dark:bg-slate-800 w-[300px] h-[101vh] py-16 px-5 -mt-14 -z-0">
     <DashBordProfile userdata={UserData} />
    </div>
  </div>
  <div className=" w-full min-h-screen  bg-slate-300 dark:bg-gray-900">
   <div className="">
    <div className="">
    <div className="w-full  bg-gray-100 shadow-lg">
     <img className='w-full h-[150px] object-center object-cover' src="https://d9s1543upwp3n.cloudfront.net/wp-content/uploads/2023/04/AI-generated-car-design-scaled.jpeg" alt="user" />
    </div>
    <div className=" relative ">
     <div className=" py-5">
      <div className="flex gap-2 items-center justify-center flex-wrap ">
      {UserCarsData.map((car, index) => (
      <CarDetails key={index} car={car} />
      ))}
      <Link href={"/CarListing"} className=' w-[300px] h-[370px]  overflow-hidden flex-col rounded flex items-center justify-center text-white border-[3px] dark:border-gray-600 dark:border-[3px] cursor-pointer bg-blue-300 transition-all duration-200 hover:bg-blue-500 '>
      <FaPlus size={50} />
      ADD LISTING
      </Link>
      </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
 {isPageLoading ?  <LoadingPage /> :"" }
</>
)
}

export default page