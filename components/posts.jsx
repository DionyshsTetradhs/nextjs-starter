"use-client";
import Example from "./example";
import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Framer() {
  const [fuck, setfuck] = useState([]);

  useEffect(() => {
    position();
  }),
    [];

  function position() {
    var box = document.getElementById("hell");

    box.style.position = "aboslute";
  }

  const handleComments = async () => {
    const apiUrl = "https://dummyjson.com/comments";
    const { data } = await axios({
      url: apiUrl,
      method: "GET",
    });
    const fuck = data.comments;
    setfuck(fuck);
    console.log(fuck);
  };

  return (
    <div>
      <div className="w-4 grid-cols-2">
        <div className="grid grid-rows-3 grid-flow-col gap-6">
          {fuck.map((item) => (
            <motion.div id={item.id} className="p-2">
              <motion.div
                className="w-80 h-300  bg-orange-500"
                drag
                whileHover={{ scale: 1.1 }}
              >
                <h1>{item.body} </h1>
                <img
                  class="h-auto max-w-full"
                  src=""
                  alt="image description"
                ></img>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <button onClick={handleComments}>Comments</button>
      <motion.div id="hello" className="p-4">
        <motion.div
          className="w-80 h-300  bg-orange-500"
          drag
          whileHover={{ scale: 1.1 }}
        >
          <h1>A fully stocked . </h1>
          <img class="h-auto max-w-full" src="" alt="image description"></img>
        </motion.div>
      </motion.div>
    </div>
  );
}
