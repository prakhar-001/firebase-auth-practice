"use client"
import React, {useState, useEffect} from 'react'
import UserOnlyRoute from "@/components/UserOnlyRoute.js";
import Link from 'next/link';
import {onAuthStateChanged, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import {auth} from '@/firebase.js'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const router = useRouter()

  const [receivedUid, setReceivedUid] = useState(null);
  const [userExists, setUserExists] = useState(false)

  useEffect(() => {
    const res = onAuthStateChanged(auth, async(abc) => {
      if(abc){
        setUserExists(true)
      }
      else{
        setUserExists(false)
      }
    })
  }, [])

//   console.log(userExists)

    const logoutHandler = async () => {
        try {
        await signOut(auth)
        .then(()=> {
            // console.log("Log out working")
            Cookies.remove("loggedInCookie")
            toast.success("Logged Out Successfully")
            router.push('/log-in')
        })
        
        } catch (error) {
        console.log(error)
        toast.error("LogOut Failed")
        }
    }

  return (
        <div className='px-5 h-12 bg-blue-500 font-semibold'>
            { userExists && (
                <div className='flex justify-between items-center h-full w-full'>
                    <div><Link href={'/'}>Gym Tracker</Link></div>
                    <div>
                        <ul className='flex justify-end gap-16'>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/page1'>Page 1</Link></li>
                            <li><Link href='/page2'>Page 2</Link></li>
                            <li><Link href='/page3'>Page 3</Link></li>
                        </ul>
                    </div>
                    <div>
                        <button onClick={logoutHandler} className='flex items-center'>Logout</button>
                    </div>
                </div>
            )}
            { !userExists && (
                <div className='flex justify-between items-center h-full w-full'>
                    <div><Link href={'/'}>Gym Tracker</Link></div>
                    <div>
                        <ul className='flex justify-end gap-5'>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/sign-in'>Sign In</Link></li>
                            <li><Link href='/log-in'>Log In</Link></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
  )
}

export default Navbar