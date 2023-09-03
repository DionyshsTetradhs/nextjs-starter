"use-client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from 'next/router'
import { BiLogOut } from "react-icons/bi";
import {BsFillSunFill} from "react-icons/bs";
import {MdDarkMode} from "react-icons/md";
import {MdQuestionMark} from "react-icons/md";

export default function Navbar() {
  useEffect(() => {
    sendreq();
    document.body.style.backgroundImage = 'linear-gradient(to bottom, #98b4fa, #FFFFFF, #CCCCCC, #FFFFFF, #98b4fa)';
  }, []);

  const [username, setUsername] = useState("");
  const [help, setHelp] = useState(false);
  let [mode, setMode] = useState(false);
  const router = useRouter()

  const sendreq = async () => {
    const data = await axios({
      url: "./api/username",
      method: "GET",
    });
    setUsername(data.data);
  };

  function handleHelp(){
      setHelp(!help);
  }
  

  function logout() {
    localStorage.clear();
    Router.reload();
  }

  function handleMode() {
    if (mode === false) {
      document.body.style.backgroundImage = 'linear-gradient(to bottom, #000000, #CCCCCC, #CCCCCC, #000000)';
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      setMode(true);
    } else {
      document.body.style.backgroundImage = 'linear-gradient(to bottom, #98b4fa, #FFFFFF, #CCCCCC, #FFFFFF, #98b4fa)';
      document.body.style.backgroundRepeat = 'repeat';
      setMode(false);
    }
  }
  
  function handleProfile(e:any) {
   e.preventDefault()
    router.push('/profile') 
  }

  return (
    <div >
            <button
              id="myButton"
              onClick={handleHelp}
              className="absolute zindex-[-10] top-3 right-16 bg-blue-200 hover:bg-blue-300 text-black-800 hover:text-white rounded-full p-4 animate-pulse"
            >
              <MdQuestionMark/>
            </button>
      <button
        className="absolute zindex-[-10] top-3 left-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse"
        onClick={logout}
      >
        <BiLogOut />
      </button>
      <div className="absolute md:left-24 left-14 bg-blue-500 bg-black-500 bg-opacity-50 text-white text-center md:top-3 top-5 rounded-lg">
        <button onClick={handleProfile}>
        <h1 className="md:text-4xl text-2xl font-bold md:p-1 md:border-2 border-1 border-gray-200 rounded-lg">{username}</h1>
        </button>
      </div>
      {mode
        ? (
          <>
            <button
              className="absolute zindex-[-10] top-3 right-2 bg-blue-200 hover:bg-blue-300 text-black-800 hover:text-white rounded-full p-4 absolute animate-pulse"
              onClick={handleMode}
            >
              <MdDarkMode />
            </button>
          </>
        )
        : (
          <button
            className="absolute zindex-[-10] top-3 right-2 bg-blue-200 hover:bg-blue-300 text-white-800 hover:text-black rounded-full p-4 absolute animate-pulse"
            onClick={handleMode}
          >
            <BsFillSunFill />
          </button>
        )}
      {help?(<><div className="absolute z-50 top-14 right-24 bg-blue-400 rounded-lg p-5">
        <ul>
          <li>Search for users(user:)</li>
          
        </ul></div></>):<></>}
    </div>
  );
}
