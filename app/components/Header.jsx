 "use client"

import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import MainButton from './utilities/MainButton'
import IsDarkModBtn from './utilities/IsDarkModBtn'
import ProfileAccount from './utilities/ProfileAccount'
import AddListing from './utilities/AddListing'
import { AiOutlineMenu } from "react-icons/ai";
import LoadingPage from './LodingPage'



// FIREBASE
import app from "@/app/firebase"
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";




function Header() {
  const [isUserLogin, setisUserLogin]= useState(false)
  const [IsMobileManuOpen,setIsMobileManuOpen] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) setisUserLogin(true)
  });

   }, [])



return (
  <>
 <div className=' relative flex items-center justify-between px-5 py-2 bg-gray-100 dark:bg-gray-900  text-black dark:text-white dark:shadow-md drop-shadow z-10'>

  {/***  LOGO BAR */}
  <div className=" text-xl text-gray-900 dark:text-white z-10">
    <Link href={"/"} >Car <span className=' text-blue-500 '>Market</span>Pace.</Link>
  </div>

  {/** Desktop ManuBar **/}
  <div className=" hidden   lg:flex text-black dark:text-white ">
    <Link href={"/"} ><MainButton title={"Home"} /></Link>
    <Link href={"/explore"} ><MainButton title={"Explore"} /></Link>
    <Link href={" "} ><MainButton title={"About Us"} /></Link>
    <Link href={" "} ><MainButton title={"Contact Us"} /></Link>
    <Link href={"/singup"} ><MainButton title={"Sing Up"} /></Link>
  </div>

  {/*** UserAccount bar and darkmod */}
  <div className=" flex gap-2 items-center  justify-center">
    <div className=""><IsDarkModBtn /></div>
    <div className=" block lg:hidden cursor-pointer hover:bg-blue-100 transition-all duration-300 " onClick={ ()=> setIsMobileManuOpen (!IsMobileManuOpen) } ><AiOutlineMenu  size={30} /></div>
    {isUserLogin ?<>
    <Link href={"/CarListing"} className=" hidden lg:block"><AddListing /></Link>
    <div className=" hidden lg:block"><ProfileAccount /></div>
    </>
    :<>
    <Link className=' hidden lg:block px-5 py-[6px] rounded bg-blue-600/20  text-[16px]' href={"/Singin"} >Login</Link>

    </>}
  </div>

 <div className={` w-[250px] -z-0 h-screen lg:hidden absolute top-0 left-0 bg-gray-200 shadow-2xl dark:bg-gray-800 transition-all duration-300 ${IsMobileManuOpen ? "ml-0 ": "  ml-[-300px]"}`} >
  <div className=" pt-20 relative h-full">
      <div className="flex flex-col text-black dark:text-white text-2xl gap-2">
        <Link href={"/"}  className={"px-2 py-3 bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"}  >Home</Link>
        <Link href={"/explore"} className={"px-2 py-3 bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"} >Explore</Link>
        <Link href={" "} className={"px-2 py-3 bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"}  >About Us</Link>
        <Link href={" "} className={"px-2 py-3 bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"}  >Contact Us</Link>
        <Link href={"/singup"} className={"px-2 py-3 bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"} >Sing Up</Link>
      </div>
      <Link href={"/Dashbord"} className={"px-2 py-5 absolute w-[100%] bottom-8 text-2xl bg-blue-200 hover:bg-blue-500 transition-all duration-300 dark:bg-blue-200/20 dark:hover:bg-blue-600"} >Dashbord</Link>
  </div>
 </div>
 </div>
  </>
)
}

export default Header