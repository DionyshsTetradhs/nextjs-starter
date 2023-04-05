"use-client";

import Router from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Posts from "./posts/posts";

export default function MainPage() {
  //Pass (key, userID) through headers for authentication
  if (localStorage) {
    axios.defaults.headers = {
      key: localStorage?.getItem("key"),
      userID: localStorage?.getItem("userID"),
    };
  }

  return (
    <>
      <div>
        <Navbar></Navbar>
        <Posts></Posts>
      </div>
    </>
  );
}
