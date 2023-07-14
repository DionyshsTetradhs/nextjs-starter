"use client"
import React, { useEffect, useState } from "react";

export default function Test() {
  const [comments, setComments] = useState([]);
  const [Type, setType] = useState();

  function handleOnDrag(e, widgetType){
    console.log("hi");
    setType(widgetType);
    // e.dataTransfer.setData("widgetType", widgetType);
  }
  
  function handleOnDrop(e,widgetType){
    // const widgetType = e.dataTransfer.getData("widgetType");
    console.log(Type);
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
          backgroundColor: "blue",
        }}
      >
      </div>
      <div
        id="second"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
        }}
      >
      </div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e,"Widget A")}
        id="666"
        style={{
          width: 50,
          height: 50,
          backgroundColor: "green",
        }}
      >
      </div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e,"Widget B")}
        id="666"
        style={{
          width: 50,
          height: 50,
          backgroundColor: "red",
        }}
      >
      </div>
      <div
        draggable
        onDragStart={(e) => handleOnDrag(e,"Widget C")}
        id="666"
        style={{
          width: 50,
          height: 50,
          backgroundColor: "blue",
        }}
      >
      </div>
    </div>
  );
}
