import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'

export default function Settings() {
  const router = useRouter()
  function handleProfile(e:any) {
   e.preventDefault()
    router.push('/profile') 
  }

  function handleMode() {
  }

  return (
    <>
      <div className="top absolute w-1/4 h-1/4 top-2 right-2 z-40 flex flex-col items-center bg-blue-400 rounded-lg p-10 flex flex-col items-center bg-blue-400 rounded-lg p-9 space-x-1">
        <button
          className="
          bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 w-64 mt-2 px-24l p-4 m-4 rounded-md shadow-md transition-colors duration-300"
          onClick={handleProfile}
        >
          Profile
        </button>
        <button className="
          bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-24 w-64 p-4 m-4 rounded-md shadow-md transition-colors duration-300"
 onClick={handleMode}>Mode</button>
      </div>
    </>
  );
}
