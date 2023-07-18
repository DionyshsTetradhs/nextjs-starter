"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Signin() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success === true) {
      window.location.href = "/";
    }
  }, [success]);

  const main_send = async () => {
    const { data } = await axios({
      url: "./api/signin_user",
      method: "POST",
      data: { email, pass },
    });
    window.localStorage.setItem("userID", data.userID);
    window.localStorage.setItem("key", data.key);
    setSuccess(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    main_send();
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              {/* <img
                srcSet="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                width="150"
                alt=""
                srcset=""
              /> */}
              <h1 className="mb-2 text-2xl ">Social Network</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={({ target }) => setEmail(target.value)}
                  type="text"
                  name="email"
                  value={email}
                  placeholder="email"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  onChange={({ target }) => setPass(target.value)}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  value={pass}
                  placeholder="password"
                />
              </div>
              <Link href="/signup" className="flex justify-center underline">
                Don't have an account?
              </Link>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Signin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
