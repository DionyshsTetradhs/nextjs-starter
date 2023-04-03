"use-client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Navbar() {
  useEffect(() => {
    sendreq();
  }, []);

  const [username, setUsername] = useState("");

  const sendreq = async () => {
    const { data } = await axios({
      url: "./api/username",
      method: "GET",
    });
    setUsername(data);
  };

  function logout() {
    localStorage.clear();
    Router.reload(window.location.pathname);
  }

  return (
    <div className="flex">
      <button className="m-2 bg-cyan-600 p-3" onClick={logout}>
        Logout
      </button>
      <h1 className=" justify-end p-4 m-2">{username}</h1>
      <img
        class="inline-block h-16 w-16 m-2 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt={username}
      />
    </div>
  );
}
