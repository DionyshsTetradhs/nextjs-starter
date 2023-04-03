"use-client";

import { motion, useInView } from "framer-motion";
import React, { useEffectDebugger, useRef, useState, useEffect } from "react";
// import Picture from "../public/pic.jpg";

export default function asdf() {
  // const constraintsRef = useRef(null);

  const elementRef1 = useRef(1);
  const isInView1 = useInView(elementRef1);

  const elementRef2 = useRef(2);
  const isInView2 = useInView(elementRef2);

  useEffect(() => {
    console.log();
  }, [isInView1, isInView2]);

  // useEffectDebugger(() => {
  //   // useEffect code here...
  // }, [isInView1, isInView2, ["asfd:", "sadf"]]);
  // function handleOnDrag(e, element_ID ) {
  //   // const element = document.getElementById("my-ele");

  //   console.log(isInView);
  // }

  // function handleOnDrop(e){
  //   const widgetType = e.dataTransfer.getData("widgetType ") as string;
  // }

  // function handleDragOver(e){
  //   e.preventDefault();
  // }

  return (
    <div className="p-4">
      <motion.div
        ref={elementRef1}
        id="fuck"
        className="w-80 h-300  bg-orange-500"
        drag
        whileHover={{ scale: 1.1 }}
        // onDragStart={(e) => handleOnDrag(e, "element id")}
        // onDragOver={handleDragOver}
        // dragConstraints={constraintsRef}
      >
        <h1>A fully stocked supermarket in Kherson. </h1>
        {/* <img className="h-10 w-10 " src={Picture} alt="hi"></img> */}
        {/* <img src={require("../public/").default} /> */}
        <img class="h-auto max-w-full" src="" alt="image description"></img>
      </motion.div>
      <motion.div
        ref={elementRef2}
        id="fuck"
        className="w-80 h-300  bg-orange-500"
        drag
        whileHover={{ scale: 1.1 }}
        onDragEnd={(event, info) => {
          // Reset the position of the element to its original position
          info.point.x = originalX;
          info.point.y = originalY;
        }}
        // onDragStart={(e) => handleOnDrag(e, "element id")}
        // onDragOver={handleDragOver}
        // dragConstraints={constraintsRef}
      >
        <h1>A fully stocked supermarket in Kherson. </h1>
        {/* <img className="h-10 w-10 " src={Picture} alt="hi"></img> */}
        {/* <img src={require("../public/").default} /> */}
        <img class="h-auto max-w-full" src="" alt="image description"></img>
      </motion.div>
    </div>
  );
}
