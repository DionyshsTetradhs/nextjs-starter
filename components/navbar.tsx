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
    // document.body.classList.toggle('dark');
    if (mode === false) {
      // document.querySelector("html").setAttribute("data-theme", "black");
      const body = document.body;
      body.style.backgroundColor = "black"; // Set the background color to black
      body.style.color = "white";
      body.style.backgroundImage = 'linear-gradient(to bottom, #000000, #CCCCCC, #000000)';
      setMode(true);
    } else {
      setMode(false);
      const body = document.body;
      body.style.backgroundColor = "white"; // Set the background color to black
      body.style.color = "black";
      body.style.backgroundImage = 'linear-gradient(to bottom, #6299E1, #FFFFFF, #CCCCCC, #FFFFFF, #6299E1)';
      // document.querySelector("html").setAttribute("data-theme","cmyk");
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
      <div className="absolute md:left-24 left-12 bg-blue-500 bg-black-500 bg-opacity-50 text-white text-center md:top-3 top-5 rounded-lg">
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
    </div>
  );
}
