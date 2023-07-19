"use-client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import {BiLogOut} from "react-icons/bi";
import {LuSettings} from "react-icons/lu";

export default function Navbar() {
  useEffect(() => {
    sendreq();
  }, []);

  const [username, setUsername] = useState("");

  const sendreq = async () => {
    const data = await axios({
      url: "./api/username",
      method: "GET",
    });
    setUsername(data.data);
  };

  function logout() {
    localStorage.clear();
    Router.reload(window.location.pathname);
  }

  return (
    <div className="flex">
      <button className="absolute zindex-[-10] top-3 left-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse" onClick={logout}>
        <BiLogOut/>
      </button>
      <h1 className="p-4 pl-40 m-2">{username}</h1>
      <img
        className="inline-block h-16 w-16 m-2 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt={username}
      />
      <button className="absolute zindex-[-10] top-3 right-2 bg-blue-200 hover:bg-blue-300 text-blue-800 hover:text-white rounded-full p-4 absolute animate-pulse" onClick={logout}>
        <LuSettings/>
      </button>
    </div>
  );
}
