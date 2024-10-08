"use client";

import Link from 'next/link';
import React, { useState ,useEffect } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { IoMailOutline, IoAppsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import LodingPage from '../components/LodingPage';



///// FREBASE FILE
import app from '../firebase';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import {  uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const auth = getAuth();
const db = getFirestore(app);




function Page() {
    
    const [Username, setUsername] = useState("");
    const [UserMailId, setUserMailId] = useState("");
    const [UserAccountPassword, setUserAccountPassword] = useState("");
    const [file, setFile] = useState(null);
    const [UploadImageUrl,setUploadImageUrl] = useState(null)
    const [LogingLoading, setLogingLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
     const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
     if (user) router.push('/Singin')
   });

    }, [])
    
    
    const HandleSignup = async () => {
        setLogingLoading(true)
        createUserWithEmailAndPassword(auth, UserMailId, UserAccountPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            HandleFileUpload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
    };
    
    const HandleFileUpload =()=>{
        const storageRef = ref(storage, `/CarMarketplace/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed",  (snapshot) => {
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },  (error) => {console.error("Upload failed:", error);}, () => {
   getDownloadURL(uploadTask.snapshot.ref).then((url) => {
   setUploadImageUrl(url)
  });
 })
}

useEffect(() => {
    if(UploadImageUrl){
     SaveUserDataInFirebase()
    }

}, [UploadImageUrl])





const SaveUserDataInFirebase = async() =>{
 try {
    const docRef = await setDoc(doc(db, `CarMarketplaceUser`,UserMailId), {
    name: Username,
    email: UserMailId,
    ProfilePic:UploadImageUrl ,
    AccountCreateDate : new Date().toLocaleString()
    });  
    router.push('/Singin')
    
    } catch (e) {
   console.log(e)
 }
}



    
    return (
        <>
        <div className='w-[98.90vw] h-screen bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex pt-28 justify-center'>
            <div className="w-[500px] h-[410px] dark:bg-gray-800/40 bg-gray-100/50 rounded shadow-2xl dark:shadow-lg p-5">
                <h5 className='text-center font-semibold'>CREATE YOUR ACCOUNT</h5>
                <form>
                    <div className="flex flex-col gap-2 pt-4">
                        <div className="flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 dark:border-gray-300/50 hover:border-blue-600 transition-all duration-300 dark:bg-gray-800/40">
                            <AiOutlineUser size={32} />
                            <input
                                type="text"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Type your name...'
                                className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40'
                                />
                        </div>

                        <div className="flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40">
                            <IoMailOutline size={32} />
                            <input
                                type="email"
                                value={UserMailId}
                                onChange={(e) => setUserMailId(e.target.value)}
                                placeholder='Type your email...'
                                className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40'
                            />
                        </div>

                        <div className="flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40">
                            <IoAppsOutline size={32} />
                            <input
                                type="password"
                                value={UserAccountPassword}
                                onChange={(e) => setUserAccountPassword(e.target.value)}
                                placeholder='Type your password...'
                                className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40'
                                />
                        </div>

                        <div className="flex items-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40">
                            <IoAppsOutline size={32} />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className='w-full h-[38px] px-1 outline-none bg-gray-100 dark:bg-gray-800/40'
                                />
                        </div>

                        <div onClick={HandleSignup} className="flex items-center justify-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 hover:bg-blue-600/50 dark:hover:bg-blue-600/50 cursor-pointer dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40">
                            submit
                        </div>
                        <p>Or</p>

                        <div className="flex items-center justify-center w-full h-[43px] px-3 gap-2 border-[3px] border-gray-300 hover:border-blue-600 hover:bg-blue-600/50 dark:hover:bg-blue-600/50 cursor-pointer dark:border-gray-300/50 transition-all duration-300 dark:bg-gray-800/40">
                            <Link href={"/Singin"}>Login Your Account</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        {LogingLoading && (<LodingPage />)}

      </>
    );
}

export default Page;
