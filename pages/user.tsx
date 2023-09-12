"use-client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function User() {
  const router = useRouter();
  const {
    query: {id, email, username, name, surname, picture },
  } = router;
  const props = {
    id,
    email,
    username,
    name,
    surname,
    picture,
  };

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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
      <div className="text-white rounded-xl bg-gray-800 bg-opacity-50 px-20 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <ul>
          <li className="flex items-end ">
        <img
          src={props.picture}
          alt="pic"
          className="w-24 h-24 rounded-lg object-cover"
        />
            <button className="pl-8 pb-10">Add Friend</button>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Username:</p>
            <p className="color-yellow-200 pl-4">{props.username}</p>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Email:</p>
            <p className="color-yellow-200 pl-12">{props.email}</p>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Name:</p>
            <p className="color-yellow-200 pl-12">{props.name}</p>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Surname:</p>
            <p className="color-yellow-200 pl-7">{props.surname}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
