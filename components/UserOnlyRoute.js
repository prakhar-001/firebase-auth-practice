"use client"
import React, { useEffect, useState, useLayoutEffect } from 'react'
import {onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '@/firebase.js'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";

export default function Home({children, onUserUidReceived}) {
  const router = useRouter()

  const [userExists, setUserExists] = useState(null)
  const [uid, setUid] = useState(null); // State to hold uid


  useEffect(() => {
    const res = onAuthStateChanged(auth, async(abc) => {
      if(abc){
        // console.log("running if block")
        setUserExists(true)
        setUid(abc.uid); // Set uid state

        // console.log(abc)
        // console.log(abc.uid + "USER ONLY ROUTE")

        onUserUidReceived(abc.uid); // Call the callback prop with uid

      }
      else{
        setUserExists(false)
        onUserUidReceived(null)
        // router.push("/log-in")
        // console.log("running else block")
      }

    })
  }, [])
  
  return (
    <div>
    {/* { */}
      {/* userExists && ( */}
      <div  className="h-full w-full">
        {children}
      </div>
      {/* // ) */}
    {/* // } */}
    {/* {
      !userExists && (
        <div className='text-5xl flex justify-center items-center h-72 w-full'>
          Login To Access This Page...
        </div>
      )
    } */}

    </div>
  );
}
