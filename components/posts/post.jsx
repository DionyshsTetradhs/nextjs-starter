"use-client";
// import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fperson%2F&psig=AOvVaw2LpmnWZ4kGwE20qa3tXK-C&ust=1681119431475000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjtxobAnP4CFQAAAAAdAAAAABAE"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    await axios({
      url: "./api/post",
      method: "POST",
      data: {
        title,
        description,
        createdAt: new Date().toISOString(),
        img: "hello",
      },
    });
      setTitle("");
      setDescription("");
    }catch(error){
      console.error('Error posting post', error);
    }
  };

  return (
    <div className="bottom absolute bottom-0 left-0 z-10 flex flex-col items-center bg-blue-400 rounded-lg p-10">
      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 z-10 flex flex-col items-center bg-blue-400 rounded-lg p-10">
        <input
          onChange={({ target }) => setTitle(target.value)}
          autoFocus
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-bold p-5 rounded-lg px-20 mt-2"
        />
        <input
          onChange={({ target }) => setDescription(target.value)}
          type="text"
          name="descr"
          value={description}
          placeholder="Description"
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
