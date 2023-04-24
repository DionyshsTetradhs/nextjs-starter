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
    const data = await axios({
      url: "./api/post",
      method: "POST",
      data: {
        title,
        description,
        createdAt: new Date().toISOString(),
        img: "hello",
      },
    });
  };

  return (
    <div className="bottom">
      <form onSubmit={handleSubmit}>
        <input
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          name="title"
          value={title}
          placeholder="title"
        />
        <input
          onChange={({ target }) => setDescription(target.value)}
          type="text"
          name="descr"
          value={description}
          placeholder="description"
        />
        {/* <input>picture</input> */}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
