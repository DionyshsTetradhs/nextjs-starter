"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Posts from "./posts/posts";
import Post from "./posts/post";
import Chat from "./chat/main";
import MenuIcon from '@mui/icons-material/Menu';
import Search from "../components/search"
import ChatText from "../components/chat_friends/main"

export default function MainPage() {
  //Pass (key, userID) through headers for authentication
  if (localStorage) {
    axios.defaults.headers = {
      key: localStorage?.getItem("key"),
      userID: localStorage?.getItem("userID"),
    };
  }
  
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

  const [posts, setPosts] = useState([]);
  const [PostID, setPostID] = useState("");
  const [chatToggle, setChatToggle] = useState(false);
  const [voiceToggle, setVoiceToggle] = useState(false);

  function handleOnDrag(PostID:string) {
    setPostID(PostID);
  }

  function handleOnDrop(Type:string) {
    if (Type === "chat"){
      setChatToggle(true);
      
    }else if(Type === "voice"){
      setVoiceToggle(true);
      
    }
    
    // console.log("widgetType" widgetType);
  }

  function minimize(){
    setChatToggle(false);
  }
  

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <>
      {chatToggle && <><button className="absolute fixed bottom-4 right-0 translate-x-5 bg-blue-500 h-12 w-12 z-[20] " onClick={minimize}><MenuIcon/></button>  <Chat id={PostID}/></>}
      <Navbar/>
      <Search/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-16">
        {posts.map((post) => (
          <div
            key={post.id}
            draggable
            onDragStart={() => handleOnDrag(post.id)}
            className="p-9 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center"
          >
            <h2 className="font-bold text-2xl mb-2">{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <div 
          id="voice"
          onDrop={()=>{handleOnDrop("voice")}}
          onDragOver={handleDragOver}
          className="absolute bottom-0 left-[-10%] w-64 h-52 bg-blue-600 rounded-full transform  translate-y-1/2 translate-x-1/2 "><h2 className="text-center">Voice</h2></div>
        {!chatToggle &&
        <div 
          id="chat"
          onDrop={()=>{handleOnDrop("chat")}}
          onDragOver={handleDragOver}
          className="absolute bottom-0 right-[-10%] w-64 h-52 bg-blue-500 rounded-full transform translate-y-1/2 -translate-x-1/2"><h2 className="text-center" >Chat</h2></div>
        }
      </div>
      <ChatText/>
    </>
  );
}
