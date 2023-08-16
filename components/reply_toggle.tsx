"use-client";
// import { motion, AnimatePresence, useInView } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

  interface ChildProps {
    username: string,
    postId: string,
  }

const Reply_toggle: React.FC<ChildProps> = (props) => {

  const postId = props.postId;
  const username = props.username;
  const [reply, setReply] = useState("");
  const [username_h1, setUsername] = useState(props.username);
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
    await axios({
      url: "./api/post_reply",
      method: "POST",
      data: {
        reply,
        postId,
        createdAt: new Date().toISOString(),
        img: "hello",
      },
    });
      setReply("");
    }catch(error){
      console.error('Error posting post', error);
    }
  };

  return (
    <div className="bottom absolute bottom-0 left-0 z-10 flex flex-col items-center bg-blue-400 rounded-lg p-10">
      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 z-10 flex flex-col items-center bg-blue-400 rounded-lg px-10 p-5">
      <div className="bg-blue-500 bg-opacity-50 text-white text-center py-4 rounded-lg">
        <h1 className="text-4xl font-bold px-40">{username_h1}</h1>
      </div>
        <input
          onChange={({ target }) => setReply(target.value)}
          autoFocus
          type="text"
          name="reply"
          value={reply}
          placeholder="Reply"
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold p-5 rounded-lg px-20 mt-2"
        />
        {/* <input>picture</input> */}
        <button type="submit"

          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold p-5 rounded-lg px-20 mt-2"
        >Send</button>
      </form>
    </div>
  );
}
export default Reply_toggle;
