"use client"

import Link from 'next/link';
import React, { useState,useEffect } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { IoAppsOutline } from "react-icons/io5";

import { useRouter } from 'next/navigation'



/// FIREBASE
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
import { onAuthStateChanged } from "firebase/auth";
import LoadingPage from '../components/LodingPage';




function page() {
  const [UserMailId,setUserMailId]=useState("")
  const [UserAccountPassword,setUserAccountPassword]=useState("")
  const [LogingLoading, setLogingLoading] = useState(false);

  const router = useRouter()


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) router.push('/Dashbord')
  });

   }, [])
   


  const handleLogin = () => {
    setLogingLoading(true)
    signInWithEmailAndPassword(auth, UserMailId, UserAccountPassword).then((userCredential) => {
      router.push('/Dashbord');
    }).catch((error) => {
    });
};


  return (
    <>
    <div className=' w-[98.90vw] h-screen bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex pt-28 justify-center'>
        <div className="w-[500px] h-[350px] dark:bg-gray-800/40 bg-gray-100/50 rounded shadow-2xl dark:shadow-lg p-5">
        <h5 className=' text-center font-semibold text-4xl'>LOGIN YOUR ACCOUNT</h5>
     <form action="">
        <div className=" flex flex-col items-center justify-center gap-2 pt-4">
           

            <div className=" flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40" >
             <AiOutlineUser size={32} className='' />
             <input type="email" value={UserMailId} onChange={(e)=>{setUserMailId(e.target.value)}} placeholder='Type your email...' className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40' />
            </div>
            
            <div className=" flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40" >
             <IoAppsOutline size={32} className='' />
             <input type="password" value={UserAccountPassword} onChange={(e)=>{setUserAccountPassword(e.target.value)}} placeholder='Type your password...' className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40' />
            </div>

            <div onClick={handleLogin} className=" flex items-center justify-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 hover:bg-blue-600/50 dark:hover:bg-blue-600/50 cursor-pointer dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40" >
              SUBMIT
            </div>
             <p>Or</p>
            <div className=" flex items-center justify-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 hover:bg-blue-600/50 dark:hover:bg-blue-600/50 cursor-pointer dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40" >
             <Link href={"/singup"} >Create Your Account</Link>
            </div>

        </div>
     </form>
        </div>
    </div>
    {LogingLoading && (<LoadingPage />)}
    </>
  )
}

export default page