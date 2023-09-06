"use-client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router"
import axios from "axios"

export default function User(){
  
  const router = useRouter()
  const { username } = router.query; // Use destructuring to get the query parameter

  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   if (username) {
  //     console.log(username);
  //     const fetchData = async () => {
  //       try {
  //         const apiUrl = "./api/get_user_profile";
  //         const response = await axios({
  //           url: apiUrl,
  //           method: "POST",
  //           data: { username },
  //         });
  //         setUser(response.data);
  //         console.log(response.data)
  //       } catch (error) {
  //         console.error("Error fetching user profile:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [username]); // Add username as a dependency



  return(
  <>
      <p>Hello</p>
      
    </>
  )
  
}
