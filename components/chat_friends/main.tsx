"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Main() {
  const [list, setList] = useState([{username_data:"-", id:"-"}]);

  useEffect(() => {
    const conv = async () => {
      try {
        const userID = localStorage?.getItem('userID');
        const data = await axios({
          data: { userID },
          url: "./api/messeges/history_list",
          method: "POST",
        });
        setList(data.data);
        // console.log(list.data);
      } catch (error) {
      }
    };
    conv();
  }, []);

  function test(){
    console.log(list);
  }
  
  return(
  <div className="absolute bottom-0 right-10 z-10" p-5 m-5>
      <ul>
        {list.map((user)=>(
        <li key={user.id}>
        {user.username_data}- {user.id}
        </li>
        ))}
      </ul>
      <button onClick={test}>TEST</button>
    </div>
  )
}
