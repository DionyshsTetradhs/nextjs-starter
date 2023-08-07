"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Posts from "./posts/posts";
import Post from "./posts/post";
import Chat from "./chat/main";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../components/search";
import ChatText from "../components/chat_friends/main";

export default function MainPage() {
  //Pass (key, userID) through headers for authentication
  if (localStorage) {
    const headers = {
      key: localStorage?.getItem("key"),
      userID: localStorage?.getItem("userID"),
    };

    Object.assign(axios.defaults.headers, headers);
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
  const [receiverID, setPostID] = useState("");
  const [postToggle, setPostToggle] = useState(false);
  const [replyToggle, setReplyToggle] = useState(false);
  const [chatToggle, setChatToggle] = useState(false);
  const [messagesToggle, setMessagesToggle] = useState(false);

  function handleOnDrag(PostID: string) {
    setPostID(PostID);
  }

  function handleOnDrop(Type: string) {
    if (Type === "chat") {
      setChatToggle(true);
    } else if (Type === "post") {
      setPostToggle(true);
    }
  }

  async function handleClickChat() {
    setMessagesToggle(true);
  }

  function handleClickPost() {
    setPostToggle(true);
  }
  
  function minimizeChat() {
    setChatToggle(false);
    setMessagesToggle(false);
  }
  
  function minimizePost() {
    setPostToggle(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <>
      {chatToggle && (
        <>
          <button
            className="absolute fixed bottom-4 right-0 translate-x-5 bg-blue-500 h-12 w-12 z-[20] "
            onClick={minimizeChat}
          >
            <MenuIcon />
          </button>{" "}
          <Chat id={receiverID} />
        </>
      )}
      <Navbar />
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-16">
        {posts.map((post) => (
          <div
            key={post.id}
            draggable
            onDragStart={() => handleOnDrag(post.userId)}
            className="p-9 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center"
          >
            <h2 className="font-bold text-2xl mb-2">{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
      
     {postToggle?(
<>
              <button
                className="absolute fixed bottom-4 left-0 bg-blue-500 h-12 w-12 z-[20] "
                onClick={minimizePost}
              >
                <MenuIcon />
              </button>{" "}
        <Post></Post>
</>
      ) :

      <div className="fixed bottom-0 left-0 right-0">
        <div
          id="post"
          onDrop={() => {
            handleOnDrop("post");
          }}
          onDragOver={handleDragOver}
          className="absolute bottom-0 left-[-10%] w-64 h-52 bg-blue-600 rounded-full transform  translate-y-1/2 translate-x-1/2 "
        >
          <h2 className="text-center">Post</h2>
          <button onClick={handleClickPost}>Post!klajsdPost</button>
        </div>
        </div>
      } 
      <div className="fixed bottom-0 left-0 right-0">
        
        {messagesToggle
          ? (
            <>
              <ChatText />
              <button
                className="absolute fixed bottom-4 right-0 translate-x-5 bg-blue-500 h-12 w-12 z-[20] "
                onClick={minimizeChat}
              >
                <MenuIcon />
              </button>{" "}
            </>
          )
          : <></>}
        {!chatToggle && !messagesToggle
          ? (
            <div
              id="chat"
              onDrop={() => {
                handleOnDrop("chat");
              }}
              onDragOver={handleDragOver}
              className="absolute bottom-0 right-[-10%] w-64 h-52 bg-blue-500 rounded-full transform translate-y-1/2 -translate-x-1/2"
            >
              <h2 className="text-center">Chat</h2>
              <button onClick={handleClickChat}>Chat</button>
            </div>
          )
          : <></>}
      </div>
    </>
  );
}
