"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter()
  

  
  return (
    <div>

      <main className=" flex flex-col items-center justify-between p-24">
        <div className='text-4xl sm:text-5xl font-bold text-white '>
          Home Page 
        </div>
        
      </main>

    </div>
  );
}
