'use client'
import { useState, useEffect } from 'react';
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, RecaptchaVerifier, signInWithPhoneNumber   } from 'firebase/auth';
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

  const handleSignUp = async () => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        .then((userExist) => {
          // console.log(userExist.user.uid)
          setEmail('');
          setPassword('')
          toast.success("Logged In Successfully")
          Cookies.set("loggedInCookie", true)
          router.push('/')
        }).catch((err) => {
            // console.log(err)
            toast.error(err.code)
        })
        // console.log({res})
        // sessionStorage.setItem('user', true)
    } catch(e){
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
    <div className="flex items-center justify-center bg-gray-900 my-5">
      <div className="bg-gray-800 p-5 sm:p-10 rounded-lg shadow-lg w-11/12 sm:w-1/3 border-2 shadow-blue-400 flex flex-col items-center gap-2">
        <h1 className="text-white text-2xl mb-5 font-bold">Log In</h1>
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
          onClick={handleSignUp}
          className="w-full p-3  bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Log In
        </button>

        <p className='text-white'>or</p>


        {/* LOG IN WITH POP UP */}
        <button onClick= {googleSignIn} className='flex h-14  w-full border-2 rounded-lg items-center pr-1 hover:bg-white'>
          <img src="/google-icon.png" alt="G" className='h-full p-1 rounded-lg'/>
          <div className="w-full p-4 h-12 flex items-center justify-center bg-indigo-600 rounded text-white ">
            Log In with Google Pop Up
          </div>
        </button>

        {/* LOG IN WITH REDIRECT */}
        <button onClick= {signWithRedirect} className='flex h-14  w-full border-2 rounded-lg items-center pr-1 hover:bg-white'>
          <img src="/google-icon.png" alt="G" className='h-full p-1 rounded-lg'/>
          <div className="w-full p-4 h-12 flex items-center justify-center bg-indigo-600 rounded text-white ">
            Log In with Google Redirect
          </div>
        </button>

        {/* Phone LOG IN */}
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
          Don't have an account? <Link href={'/sign-up'} className='text-blue-500'>Sign Up</Link>
        </div>

      </div> 
    </div>
  );
};

export default SignUp;