"use-client";
// import Example from "../example";
// import { motion, AnimatePresence, useInView, useTransform, useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios({
      url: "./api/posts",
      method: "GET",
    }); 
        setPosts(response.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchPosts();
  }, []);
    
    
  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen py-20">
      {posts.map((post) => (
        <div key={post.id} className="p-6 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
          <h2 className="font-bold text-2xl mb-2">{post.title}</h2>
          <p>{post.description}</p> 
        </div>
      ))}
    </div>
      
  );
}
