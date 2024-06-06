'use client'
import { useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult  } from 'firebase/auth';
import {auth} from '@/firebase.js'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from 'next/link';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  

  useEffect(() => {
    getUserData()
  }, [])

  // EMAIL PASS SIGN UP
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // console.log("user created")
            setEmail('');
            setPassword('');
            toast.success("User Registered Successfully")
            Cookies.set("loggedInCookie", true)
            router.push('/')
        })
        .catch((err) => {
            toast.error(err.code)
        })
        // console.log({res});
        // sessionStorage.setItem('user', true)
    }catch(e){
        console.error(e)
    }
  };

  // SIGN UP WITH POP UP
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
      try {
        const res = await signInWithPopup(auth, provider)
        .then((userData) => {
            console.log(userData.user.uid + "POPUP")
            // setEmail('');
            // setPassword('');
            toast.success("Success")
            Cookies.set("loggedInCookie", true)
            router.push('/')
        })
        .catch((err) => {
            toast.error(err.code)
        })
      }catch(e){
          console.error(e)
      }
    
  }

  // SIGN UP WITH REDIRECT
  const signWithRedirect = () => {
    const provider = new GoogleAuthProvider()
    try {
      const res = signInWithRedirect(auth, provider)
    } catch (e) {
      console.error(e)
    }
  }

  // GET GOOGLE REDIRECT DATA
  const getUserData = async () => {
    const response = await getRedirectResult(auth)
    if(response){
      console.log(response.user.uid + "REDIRECT")
      toast.success("Success")
      Cookies.set("loggedInCookie", true)
      router.push('/')
    }
  }



  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 my-10">
      {/* SIGN UP WITH EMAIL PASS */}
      <div className="bg-gray-800 p-5 sm:p-10 rounded-lg shadow-lg w-11/12 sm:w-1/3 border-2 shadow-blue-400  flex flex-col items-center gap-2">
        <h1 className="text-white text-2xl mb-5 font-bold">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>

        <p className='text-white'>or</p>


        {/* SIGN UP WITH POP UP */}
        <button onClick= {googleSignIn} className='flex h-14  w-full border-2 rounded-lg items-center pr-1 hover:bg-white mb-2'>
          <img src="/google-icon.png" alt="G" className='h-full p-1 rounded-lg'/>
          <div className="w-full p-4 h-12 flex items-center justify-center bg-indigo-600 rounded text-white ">
            Sign Up with Google Pop Up
          </div>
        </button>

        {/* SIGN UP WITH REDIRECT */}
        <button onClick= {signWithRedirect} className='flex h-14  w-full border-2 rounded-lg items-center pr-1 hover:bg-white'>
          <img src="/google-icon.png" alt="G" className='h-full p-1 rounded-lg'/>
          <div className="w-full p-4 h-12 flex items-center justify-center bg-indigo-600 rounded text-white ">
            Sign Up with Google Redirect
          </div>
        </button>

        <p className='text-white'>or</p>

        <div className='flex justify-center gap-2 text-white'>
          Already have an account? <Link href={'/log-in'} className='text-blue-500'>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;