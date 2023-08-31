"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength'

export default function Signin() {
  var passwordHash = require('password-hash');
  
  const [pass, setPass] = useState("");
  const [passConf, setPassConf] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailValidation, setEmailValidation] = useState(true);
  const [usernameValidation, setUsernameValidation] = useState(true);
  const [passStrength, setPassStrength] = useState("");
  
  const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setEmailValidation(EmailValidator.validate(e.target.value));
  } 
  
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
  
  async function handleChangeUsername(e:ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    const result = await checkUsername(e.target.value);
    try{
      
    if (result.data === ""){
      setUsernameValidation(true);
      
    }else{
      setUsernameValidation(false);
    };
      
    }catch(err){
      console.error(err.response);
    }
  }
  
  const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    setPassStrength(passwordStrength(e.target.value).value);
  };
  

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
        data: { email, pass },
      });
      window.localStorage.setItem("key", data.key);
      window.localStorage.setItem("userID", data.userID);
    } catch (err) {
      console.error(err.response);
    }
  };

  //Post request with axios
  const main_send = async () => {
    const hashedPassword:string = passwordHash.generate(pass);
    const apiUrlEndpoint = "./api/signup";
    const signup_info = { username, email, pass:hashedPassword };
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

  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if ((pass === passConf) && (username !== "") && (EmailValidator.validate(email))) {
      main_send();
    } else if ((EmailValidator.validate(email)===false)) {
      alert("Please fill the inputs again!");
    } else {
      alert("Password is not the same");
    }
  }

  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    setPassConf(e.target.value);
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="mb-2 text-2xl ">S.N.</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
              <div className="text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={handleChangeUsername}
                  type="text"
                  name="name"
                  placeholder="username"
                />
              </div>
              {usernameValidation?<p className="errors text-green-800">valid </p>:<p className="errors text-red-800">taken</p>}
              <div className="text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={handleChangeEmail}
                  type="text"
                  name="email"
                  placeholder="email"
                />
              </div>
              {emailValidation?<p className="errors text-green-800">valid </p>:<p className="errors text-red-800">not valid</p>}
              <div className="mb-1 text-lg">
                <input
                  onChange={handleChangePassword}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  value={pass}
                  placeholder="password"
                />
              </div>
              
              <div className="mb-4 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  value={passConf}
                  placeholder="Confirm pass"
                />
              </div>
              <p>{passStrength}</p>
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
