"use-client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from 'next/router'
import { BiLogOut } from "react-icons/bi";
import {BsFillSunFill} from "react-icons/bs";
import {MdDarkMode} from "react-icons/md"

export default function Navbar() {
  useEffect(() => {
    sendreq();
  }, []);

  const [username, setUsername] = useState("");
  let [mode, setMode] = useState(false);
  const router = useRouter()

  const sendreq = async () => {
    const data = await axios({
      url: "./api/username",
      method: "GET",
    });
    setUsername(data.data);
  };

  function logout() {
    localStorage.clear();
    Router.reload();
  }

  function handleMode() {
    console.log("settings");
    // document.body.classList.toggle('dark');
    document.documentElement.classList.add("dark");
    if (mode === false) {
      setMode(true);
    } else {
      setMode(false);
    }
  }
  
  function handleProfile(e:any) {
   e.preventDefault()
    router.push('/profile') 
  }

  return (
    <div className="flex">
      <button
        className="absolute zindex-[-10] top-3 left-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse"
        onClick={logout}
      >
        <BiLogOut />
      </button>
      <div className="absolute left-24 bg-blue-500 dark:bg-black-500 bg-opacity-50 text-white text-center top-3 rounded-lg">
        <button onClick={handleProfile}>
        <h1 className="text-4xl font-bold p-1 border-2 border-gray-200 rounded-lg">{username}</h1>
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
    </div>
  );
}
