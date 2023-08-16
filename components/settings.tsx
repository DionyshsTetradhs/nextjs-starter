import React, { useEffect, useState, useRef } from "react"

export default function Settings() {

  function handleProfile (){
  }
  
  function handleStuff (){
  }
  
  function handleMode (){
  }
  
  return(
    <>
    <div className="top absolute top-2 right-2 z-40 flex flex-col items-center bg-blue-400 rounded-lg p-10">
        <button onClick={handleProfile}>Profile</button>
        <button onClick={handleStuff}>Stuff</button>
        <button onClick={handleMode}>Mode</button>
    </div>
  </>
  )
}
