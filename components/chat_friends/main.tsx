"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Main() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const conv = async () => {
      try {
        const userID = localStorage?.getItem('userID');
        const list = await axios({
          data: { userID },
          url: "./api/messeges/history_list",
          method: "POST",
        });
        setList(list.data);
        // console.log(list.data);
      } catch (error) {
      }
    };
    conv();
  }, []);
  
  return(
  <div className="absolute bottom-0 right-0 z-10" p-5 m-5>
      <ul>
      </ul>
      
    </div>
  )
}
