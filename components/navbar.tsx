"use-client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { BiLogOut } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import Settings from "./settings";

export default function Navbar() {
  useEffect(() => {
    sendreq();
  }, []);

  const [username, setUsername] = useState("");
  let [settings, setSettings] = useState(false);
  const myDivRef = useRef(null);

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

  useEffect(() => {
    const divElement = myDivRef.current;

    const handleDocumentClick = (event) => {
      if (divElement && !divElement.contains(event.target)) {
        setSettings(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function handleSettings() {
    console.log("settings");
    if (settings === false) {
      setSettings(true);
    } else {
      setSettings(false);
    }
  }

  return (
    <div className="flex">
      <button
        className="absolute zindex-[-10] top-3 left-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse"
        onClick={logout}
      >
        <BiLogOut />
      </button>
      <div className="absolute left-24 bg-blue-500 bg-opacity-50 text-white text-center top-3 rounded-lg">
        <h1 className="text-4xl font-bold p-1">{username}</h1>
      </div>
      {settings
        ? (
          <>
            <Settings></Settings>
            <button
              className="absolute z-50 top-3 right-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse"
              onClick={handleSettings}
            >
              <LuSettings />
            </button>
          </>
        )
        : (
          <button
            className="absolute zindex-[-10] top-3 right-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse"
            onClick={handleSettings}
          >
            <LuSettings />
          </button>
        )}
    </div>
  );
}
