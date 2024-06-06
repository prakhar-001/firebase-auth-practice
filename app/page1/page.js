"use client"
import React, {useState} from 'react'
import UserOnlyRoute from "@/components/UserOnlyRoute.js";

const page = () => {
  const [receivedUid, setReceivedUid] = useState(null);

  const handleUidReceived = (uid) => {
    setReceivedUid(uid);
    // console.log('UID received:', uid);
    // You can now use the receivedUid state in your parent component
  };

  return (
    <UserOnlyRoute onUserUidReceived={handleUidReceived}>
      <main className=" flex flex-col items-center justify-between p-24">
        <div className='text-4xl sm:text-5xl font-bold text-white '>
          Page 1 
        </div>
        
      </main>
    </UserOnlyRoute>
  )
}

export default page