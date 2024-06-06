'use client'
import { useState } from 'react';
import {signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/firebase.js'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import Cookies from "js-cookie";


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()


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

  return (
    <div className="flex items-center justify-center bg-gray-900 my-36">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-1/3 border-2">
        <h1 className="text-white text-2xl mb-5">Log In</h1>
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
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Log In
        </button>
      </div>
      
    </div>
  );
};

export default SignUp;