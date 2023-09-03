"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Main({ onChildEvent }) {
  const [list, setList] = useState([{ username_data: "-", id: "-" }]);

  useEffect(() => {
    const conv = async () => {
      try {
        const userID = localStorage?.getItem("userID");
        const data = await axios({
          data: { userID },
          url: "./api/messeges/history_list",
          method: "POST",
        });
        setList(data.data);
      } catch (error) {
      }
    };
    conv();
  }, []);

  return (
    <div className="absolute border-t pt-4 overflow-y-auto max-h-80 bottom-0 right-1 z-10 flex flex-col items-center bg-blue-400 rounded-lg p-9 space-x-1">
      {list.map((user) => (
        <button
          id={user.id}
          key = {user.id}
          onClick={(event) => {
            const buttonId = event.currentTarget.id;
            onChildEvent(buttonId);
          }}
          className="px-8 py-6 rounded-lg w-64 bg-blue-500 space-x-4 hover:bg-blue-600 text-white font-bold rounded-lg px-20 mt-2"
        >
          {user.username_data}
        </button>
      ))}
    </div>
  );
}
