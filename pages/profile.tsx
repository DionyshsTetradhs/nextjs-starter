"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { passwordStrength } from "check-password-strength";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";

export default function Profile() {
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "./api/get_user";
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      const response = await axios({
        url: apiUrl,
        method: "POST",
        data: { storedKey, storedUserID },
      });
      setUsername(response.data.username);
    };
    fetchData();
    return undefined;
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(true);
  const [passStrength, setPassStrength] = useState("");
  var passwordHash = require("password-hash");
  const router = useRouter();

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassStrength(passwordStrength(e.target.value).value);
  };

  async function checkUsername(name: string) {
    const apiUrl = "./api/username_validation";
    try {
      const data = await axios({
        url: apiUrl,
        method: "POST",
        data: { username: name },
      });
      return data;
    } catch (err) {
      console.error(err.response);
    }
  }

  async function formSubmit(e: FormEvent) {
    e.preventDefault();
    if (password === passwordV && usernameValidation) {
      const hashedPassword: string = passwordHash.generate(password);
      const apiUrl = "./api/save_user";
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      await axios({
        url: apiUrl,
        method: "POST",
        data: { storedKey, storedUserID, username, hashedPassword },
      });
      router.push("/");
    } else {
      alert("Password is not the same or username exists!");
    }
  }

  async function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    const result = await checkUsername(e.target.value);
    if (result.data === "") {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  }

  function goHome(){
    router.push("/");
  }

  function handleChangePasswordV(e: ChangeEvent<HTMLInputElement>) {
    setPasswordV(e.target.value);
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-20 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="flex flex-col items-center">
            <button onClick={goHome} className="text-white text-center justify-center">
              <FaHome className="w-12 h-12 mb-4 text-center" />
            </button>
          </div>
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <span className="text-gray-300">
                Change your profile information
              </span>
            </div>
            <form
              onSubmit={formSubmit}
              className="flex flex-col items-center justify-center"
            >
              <div className=" text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={handleChangeUsername}
                  type="text"
                  name="email"
                  value={username}
                  placeholder="username"
                />
              </div>
              {usernameValidation
                ? <p className="errors text-green-800">valid</p>
                : <p className="errors text-red-800">taken</p>}
              <div className="mb-1 text-lg">
                <input
                  onChange={handleChangePassword}
                  className="flex justify-center items-center rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  placeholder="New password"
                  required
                />
              </div>
              <p>{passStrength}</p>

              <div className="mb-4 text-lg">
                <input
                  onChange={handleChangePasswordV}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  value={passwordV}
                  placeholder="Confirm password"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
