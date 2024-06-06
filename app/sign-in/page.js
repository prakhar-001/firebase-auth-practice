'use client'
import { useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import {auth} from '@/firebase.js'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Cookies from "js-cookie";


import { signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  

  useEffect(() => {
    getUserData()
  }, [])

  // EMAIL PASS SIGN IN
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

  // SIGN IN WITH POP UP
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

  // SIGN IN WITH REDIRECT
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
      // router.push('/')
    }
  }



  return (
    <div className="flex items-center justify-center bg-gray-900 my-36">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-1/3 border-2">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
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
          Sign In
        </button>
      </div>

      {/* SIGN IN WITH POP UP */}
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-1/3 border-2">
        <h1 className="text-white text-2xl mb-5">Sign In with Google</h1>
        <button 
          onClick= {googleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
          Google Pop Up
        </button>
      </div>

      {/* SIGN IN WITH REDIRECT */}
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-1/3 border-2">
        <h1 className="text-white text-2xl mb-5">Sign In with Google Rdirect</h1>
        <button 
          onClick= {signWithRedirect}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
          Google Redirect
        </button>
      </div>
    </div>
  );
};

export default SignIn;