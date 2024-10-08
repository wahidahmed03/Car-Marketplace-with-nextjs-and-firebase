"use client"

import Link from 'next/link';
import React, { useState,useEffect } from 'react'
import { AiOutlineUser ,AiOutlineAlignCenter,AiFillSetting   } from "react-icons/ai";
import MainButton from './MainButton';



// FIREBASE
import app from "@/app/firebase"
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { doc,getDoc,getFirestore  } from "firebase/firestore"; 
const db = getFirestore(app);




function ProfileAccount() {

  const [IseUserDetailsProfile,setIseUserDetailsProfile] = useState(false)
  const[LogingUserEmail,setLogingUserEmail]= useState(null)
  const [UserData,setUserData]= useState( " ")

useEffect(  () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setLogingUserEmail(user.email)
});
 }, [])

 useEffect(() => {
  if(LogingUserEmail){
    UserAllInformationData()
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






  return (
    <div className='w-[35px] h-[35px] rounded-full bg-slate-600 flex items-center justify-center cursor-pointer relative  ' onClick={()=>{setIseUserDetailsProfile(!IseUserDetailsProfile)}}>
         <AiOutlineUser />

         {/* USER PROFILE HOVER TEXT  */}
         <div className={` w-[150px] px-3 h-[27px] rounded bg-slate-500 absolute -bottom-[27px] group-hover:opacity-100 opacity-0 -right-1 ${IseUserDetailsProfile ? "hidden":""}`}>Wahid ahmed</div>


        {/* USER PROFILE DETAILS  */}
        {IseUserDetailsProfile ? 
         <div className={`w-[180px] h-[200px] top-10 right-0 bg-gray-200 dark:bg-gray-800 shadow-2xl border border-gray-500  dark:border-gray-100 dark:text-white absolute rounded z-50 p-1 items-center justify-center  ${IseUserDetailsProfile ? "mt-0 opacity-100":"-mt-5 opacity-0"} `  }>
          <div className=" flex gap-1 items-center justify-center">
            <div className="w-[50px] h-[50px] rounded-full bg-black">
              <img src={UserData.ProfilePic} className="w-[50px] h-[50px] rounded-full " alt="" />
            </div>
            <div className="">
              <h6 className=' text-[12px] uppercase'>{UserData.name}</h6>
              <p className=' text-[10px]'>{UserData.email}</p>
            </div>
          </div>
          <div className="w-full h-[2px] bg-slate-700 mt-3"></div>
          <div className=" py-3 flex flex-col gap-2">
            <Link href={"/Dashbord"} className=' flex items-center '  >
              <AiOutlineAlignCenter size={20} />
              <MainButton title={"Dashbord"} />
            </Link>
            <Link href={"/Dashbord"} className=' flex items-center '  >
              <AiOutlineUser size={20} />
              <MainButton title={"Your Listing"} />
            </Link>
            <Link href={"/Dashbord"} className='flex items-center '  >
              <AiFillSetting   size={20} />
              <MainButton title={"setting"} />
            </Link>
          </div>

          <div className="w-full h-[2px] bg-slate-700 mt-3"></div>
         </div>:""}




    </div>
  )
}

export default ProfileAccount