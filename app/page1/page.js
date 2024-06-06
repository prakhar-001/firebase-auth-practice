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
      <div>page 1</div>
    </UserOnlyRoute>
  )
}

export default page