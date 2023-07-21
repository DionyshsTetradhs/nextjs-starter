"use-client";
import SignIn from "./signin";
import MainPage from "./mainpage";
import React, { useEffect, useState } from "react";

export default function Main() {
  const [isAuthed, setIsAuthed] = useState(false);


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

  function handleClick(){
    setIsAuthed(true);
  }
//Fix css for button
  return <>{isAuthed ? <MainPage></MainPage> : <><SignIn></SignIn><button onClick={handleClick} className="fixed zIndex:10">Check Website without logging in.</button></>}</>;
}
