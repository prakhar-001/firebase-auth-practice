'use client'
import { useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, RecaptchaVerifier, signInWithPhoneNumber  } from 'firebase/auth';
import {auth} from '@/firebase.js'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Link from 'next/link';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  
  const [phone, setPhone] = useState("")
  const [user, setUser] = useState(null)
  const [otp, setOtp] = useState("")

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
            toast.success("Logged In With Pop UP Successfully")
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
      toast.success("Logged In With Redirect Successfully")
      Cookies.set("loggedInCookie", true)
      router.push('/')
    }
  }

  const sendOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptchaID", {})
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
      .then((confirmationResult) => {
        // console.log(confirmationResult)
        setUser(confirmationResult)
      })
      .catch((error) => {
        console.log(error)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const verifyOTP = async () => {
    try {
      const data = await user.confirm(otp)
      .then((result) => {
        console.log(result.user.uid)
        toast.success("Logged In With Phone Number Successfully")
        Cookies.set("loggedInCookie", true)
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })      
    } catch (error) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 my-5">
      {/* SIGN UP WITH EMAIL PASS */}
      <div className="bg-gray-800 p-3 sm:p-10 rounded-lg shadow-lg w-11/12 sm:w-1/3 border-2 shadow-blue-400  flex flex-col items-center gap-2">
        <h1 className="text-white text-2xl mb-5 font-bold">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>

        <p className='text-white'>or</p>


        {/* SIGN UP WITH POP UP */}
        <button onClick= {googleSignIn} className='flex h-14  w-full border-2 rounded-lg items-center pr-1 hover:bg-white'>
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


        {/* Phone SIGN UP */}
        <div className='w-full'>
          
          <PhoneInput country={"in"} value={phone} onChange= {(phone) => setPhone("+" + phone)} className='mb-1 pl-4 sm:pl-16' />
          <div id="recaptchaID" className='pl-4 sm:pl-16'></div>
          <div className='flex h-10 gap-1'>
            <button onClick={sendOTP} className="p-3 bg-indigo-600 rounded-lg w-1/4 flex items-center text-sm sm:text-base">Send OTP</button>
            <input 
            type="number" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="p-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-500 w-2/4"
            />
            <button onClick={verifyOTP} className="p-3 bg-indigo-600 rounded-lg w-1/4 flex items-center text-sm sm:text-base">Verify OTP</button>
          </div>
        </div>


        {/* <p className='text-white'>or</p> */}

        <div className='flex justify-center gap-2 text-white'>
          Already have an account? <Link href={'/log-in'} className='text-blue-500'>Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;