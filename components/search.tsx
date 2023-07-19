import React, { useEffect, useState, useRef } from "react"
import { BiSearchAlt } from 'react-icons/bi';

export default function Search() {

  const [visibility, setVisibility] = useState(true);
  const [input, setInput] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    setInput("");
    setVisibility(!visibility);
    
  }
  
  const handleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setVisibility(!visibility);
  };
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    // Code to execute when the input loses focus
    console.log('Input field lost focus');
    setVisibility(!visibility);
    // Additional code or function calls can be placed here
  };
  
  return(
    <>
      {visibility? <><div className="absolute container top-3 mx-0 min-w-full flex flex-col items-center"><button className="absolute zindex-[-10] bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse" onClick={handleVisibility}><BiSearchAlt /></button> </div></>:

          <div className="absolute container top-4 mx-0 min-w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="absolute container top-1 mx-0 min-w-full flex flex-col items-center">
            
        <input className="absolute animate-appear text-center outline-none bg-gray-100 border-gray-300 focus:outline-none rounded-md w-80 h-12 text-lg" autoFocus id="searchInput" ref={inputRef} onBlur={handleBlur} value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Search"></input>
        <button type="submit"></button>
        
      </form>
          </div>
      }
      
  </>
  )
}
