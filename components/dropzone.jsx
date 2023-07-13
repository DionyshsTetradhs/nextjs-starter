"use client"
import {
  AnimatePresence,
  motion,
  useDragControls,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Framer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isColliding = useTransform(x, (x) => x > 100 && x < 200);
  const [comments, setComments] = useState([]);

  function handleOnDrag(e, widgetType){
    console.log("hi");
    // e.dataTransfer.setData("widgetType", widgetType);
  }
  
  function handleOnDrop(e){
    // const widgetType = e.dataTransfer.getData("widgetType");
    console.log("hello");
    // console.log("widgetType" widgetType);
  }

  function handleDragOver(e){
    e.preventDefault();
    console.log("fuck");
  }

  return (
    <div>
      <div
        id="dropzone"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        style={{
          width: 100,
          height: 100,
          backgroundColor: isColliding ? "blue" : "red",
        }}
      >
      </div>
      <motion.div
        draggable
        onDragStart={(e) => handleOnDrag(e,"Widget A")}
        id="666"
        drag
        style={{
          x,
          y,
          width: 50,
          height: 50,
          backgroundColor: "green",
        }}
      >
      </motion.div>
    </div>
  );
}
