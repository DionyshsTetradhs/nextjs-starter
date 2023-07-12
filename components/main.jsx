"use-client";
import SignIn from "./signin";
import MainPage from "./mainpage";
import React, { useEffect, useState } from "react";

export default function Main() {
  const [isAuthed, setIsAuthed] = useState(false);

  //FIX ATHENTICATION, RIGHT NOW IT'S NOT REALLY AUTHENTICATING SHIT
  useEffect(() => {
    check_local_storage();
  }, []);
  const check_local_storage = () => {
    if (
      localStorage.getItem("userID") == null ||
      localStorage.getItem("key") == null
    ) {
      setIsAuthed(false);
    } else {
      setIsAuthed(true);
    }
    // }
  };

  return <>{isAuthed ? <MainPage></MainPage> : <SignIn></SignIn>}</>;
}
