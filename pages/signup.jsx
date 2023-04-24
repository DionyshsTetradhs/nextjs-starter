"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Signin() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success === true) {
      window.location.href = "/";
    }
  }, [success]);

  const get_key = async () => {
    const apiUrl = "./api/signin_user";
    try {
      const { data } = await axios({
        url: apiUrl,
        method: "POST",
        data: { email, pass: input1 },
      });
      window.localStorage.setItem("key", data.key);
      window.localStorage.setItem("userID", data.userID);
    } catch (err) {
      console.error(err.response);
    }
  };

  //Post request with axios
  const main_send = async () => {
    const apiUrlEndpoint = "./api/signup";
    const signup_info = { username, email, input1 };
    try {
      const { data } = await axios({
        url: apiUrlEndpoint,
        method: "POST",
        data: signup_info,
      });
      if (data === "Signup:success") {
        await get_key();
        setSuccess(true);
      } else {
        alert("Username or Password is incorect..");
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if ((input1 == input2) & (username !== "") & (email !== "")) {
      main_send();
    } else if ((username == "") & (email == "")) {
      alert("Please fill the inputs again!");
    } else {
      console.log("Password is not the same");
    }
  }

  function handleChange1(e) {
    setInput1(e.target.value);
  }
  function handleChange2(e) {
    setInput2(e.target.value);
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              {/* <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" srcset="" /> */}
              <h1 className="mb-2 text-2xl ">Social Network</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={({ target }) => setUsername(target.value)}
                  type="text"
                  name="name"
                  placeholder="username"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={({ target }) => setEmail(target.value)}
                  type="text"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  onChange={handleChange1}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  value={input1}
                  placeholder="password"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  onChange={handleChange2}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  value={input2}
                  placeholder="Confirm pass"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
