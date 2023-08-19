"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength'

export default function Profile() {
  const [email,setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [usernameValidation, setUsernameValidation] = useState(true);
  const [passStrength, setPassStrength] = useState("");
  
  const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassStrength(passwordStrength(e.target.value).value);
  };

  async function checkUsername(name:string){
    const apiUrl = "./api/username_validation";
    try {
      const data = await axios({
        url: apiUrl,
        method: "POST",
        data: {username:name},
      });
      return data;
    } catch (err) {
      console.error(err.response);
    }
  };
  // async function formSubmit(){
  //   
  //   const hashedPassword:string = passwordHash.generate(pass);
  // }
  
  function handleChangeEmail(e:ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailValidation(EmailValidator.validate(e.target.value));
  }
  
  async function handleChangeUsername(e:ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    const result = await checkUsername(e.target.value);
    if (result.data === ""){
      setUsernameValidation(true);
      
    }else{
      setUsernameValidation(false);
    };
  }
  
  function handleChangePasswordV(e:ChangeEvent<HTMLInputElement>) {
    setPasswordV(e.target.value);
  }
  
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-20 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <span className="text-gray-300">Change your profile information</span>
            </div>
            <form  className="flex flex-col items-center justify-center">
              <div className="text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={handleChangeEmail}
                  type="text"
                  name="name"
                  value={email}
                  placeholder="email"
                />
              </div>
              {emailValidation?<p className="errors text-green-800">valid </p>:<p className="errors text-red-800">not valid</p>}

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
              {usernameValidation?<p className="errors text-green-800">valid </p>:<p className="errors text-red-800">taken</p>}
              <div className="mb-1 text-lg">
                <input
                  onChange={handleChangePassword}
                  className="flex justify-center items-center rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  placeholder="password"
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
                  placeholder="Confirm pass"
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
