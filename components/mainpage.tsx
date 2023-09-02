"use-client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Posts from "./posts/posts";
import Post from "./posts/post";
import Chat from "./chat/main";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "../components/search";
import ChatText from "../components/chat_friends/main";
import Reply_toggle from "../components/reply_toggle";
import PostExpand from "../components/post_expand";
import { searchPosts } from "../lib/utils";

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
  const [postId, setPostId] = useState("");
  const [username_p, setUsername_p] = useState("");
  const [search, setSearch] = useState("");
  const [togglePostExpand, setTogglePostExpand] = useState(false);
  const [postUsername, setPostUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postReplies, setPostReplies] = useState([]);
  const [chatID, setChatID] = useState("");

  function handleOnDrag(PostID: string, postID: string, username: string) {
    setUsername_p(username);
    setPostID(PostID);
    setPostId(postID);
  }

  async function handleOnDrop(Type: string) {
    if (Type === "chat") {
      try {
        await axios({
          url: "./api/post_init",
          method: "POST",
          data: { postid: postId },
        });
      } catch (err) {
        console.error(err);
      }
      const result = await axios({
        url: "./api/get_chat_id",
        method: "POST",
        data: { receiverID },
      });
      setChatID(result.data);
      setChatToggle(true);
    } else if (Type === "post") {
      setReplyToggle(true);
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
    setReplyToggle(false);
  }

  async function handlePostClick(
    post_id: string,
    username: string,
    title: string,
    description: string,
  ) {
    setPostUsername(username);
    setPostTitle(title);
    setPostDescription(description);
    setPostId(post_id);
    setTogglePostExpand(true);
  }

  function handleTogglePostExpand() {
    setTogglePostExpand(!togglePostExpand);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleChildEvent(buttonId: string) {
    setPostID(buttonId);
    const result = await axios({
      url: "./api/get_chat_id",
      method: "POST",
      data: { buttonId },
    });
    setChatID(result.data);
    setMessagesToggle(false);
    setChatToggle(true);
  }

  const onSearchChange = async (searchQuery: string) => {
    setSearch(searchQuery);
    try {
      const result = await axios({
        url: "./api/search",
        method: "POST",
        data: { searchQuery },
      });
      setPosts(result.data);
      return (result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 h-screen dark:bg-black-500"> 
      {chatToggle && (
        <>
          <button
            className="absolute fixed bottom-4 right-0 translate-x-5 bg-blue-500 h-12 w-12 z-[20] "
            onClick={minimizeChat}
          >
            <MenuIcon />
          </button>
          <Chat id={receiverID} chatId={chatID} />
        </>
      )}
      <Navbar />
      <SearchBar onSearch={onSearchChange} value={search} />
      <PostExpand
        onChange={handleTogglePostExpand}
        togglePostExtend={togglePostExpand}
        post_id={postId}
        username={postUsername}
        title={postTitle}
        description={postDescription}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-16 py-24">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() =>
              handlePostClick(
                post.id,
                post.username,
                post.title,
                post.description,
              )}
            draggable
            onDragStart={() =>
              handleOnDrag(post.userId, post.id, post.username)}
            className="p-4 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-100 text-white text-center"
          >
            <h2 className="bg-white text-black rounded-full px-2 w-min">{post.username}</h2>
            <h1 className="font-bold text-2xl mb-2">{post.title}</h1>
            <p className="bg-white px-2 text-black rounded-full">{post.description}</p>
          </div>
        ))}
      </div>

      {postToggle
        ? (
          <>
            <button
              className="absolute fixed bottom-4 left-0 bg-blue-500 h-12 w-12 z-[20] "
              onClick={minimizePost}
            >
              <MenuIcon />
            </button>{" "}
            <Post></Post>
          </>
        )
        : replyToggle
        ? (
          <>
            <Reply_toggle postId={postId} username={username_p}></Reply_toggle>
            <button
              className="absolute fixed bottom-4 left-0 bg-blue-500 h-12 w-12 z-[20] "
              onClick={minimizePost}
            >
              <MenuIcon />
            </button>
          </>
        )
        : (
          <div className="fixed bottom-0 left-0 right-0">
            <div
              id="post"
              onDrop={() => {
                handleOnDrop("post");
              }}
              onDragOver={handleDragOver}
              className="absolute md:scale-150 bottom-0 md:left-[-10%] md:w-64 px-10 md:h-64 bg-blue-400 rounded-full transform  translate-y-1/2 md:translate-x-8 translate-x-0 scale-120 left-[-30%] w-64 h-64"
            >
              <h2 className="text-center absolute overflow-hidden shadow-md text-white scale-100 bottom-0 left-[-10%] w-64 px-10 h-64 rounded-full transform  translate-y-14 translate-x-16">
                Post
              </h2>
              <button
                onClick={handleClickPost}
                className="absolute scale-100 bottom-0 left-[-10%] w-64 px-10 h-64 rounded-full transform  translate-y-2/6 translate-x-8"
              >
              </button>
            </div>
          </div>
        )}
      <div className="fixed bottom-0 left-0 right-0">
        {messagesToggle
          ? (
            <>
              <ChatText onChildEvent={handleChildEvent} />
              <button
                className="absolute fixed overflow-hidden bottom-4 right-0 translate-x-5 bg-blue-500 h-12 w-12 z-[20] "
                onClick={minimizeChat}
              >
                <MenuIcon className="overflow-hidden"/>
              </button>
              {" "}
            </>
          )
          : <></>}

        {!chatToggle && !messagesToggle
          ? (
            <div className="fixed bottom-0 left-0 right-0">
              <div
                id="chat"
                onDrop={() => {
                  handleOnDrop("chat");
                }}
                onDragOver={handleDragOver}
                className="absolute bottom-0 md:right-[-5%] right-[-30%] px-10 md:w-64 md:h-64 bg-blue-400 rounded-full transform translate-y-1/2 md:translate-x-8 translate-x-0 md:scale-150 scale-120 w-64 h-64"
              >
                <h2 className="text-center overflow-hidden shadow-md text-white  absolute scale-100 bottom-0 w-64 h-64 right-[40%] rounded-full transform translate-y-14 translate-x-16">
                  Chat
                </h2>
                <button
                  onClick={handleClickChat}
                  className="absolute scale-120 bottom-0 right-[-1%] w-64 h-64 rounded-full transform  translate-y-2/6 translate-x-4/10 "
                >
                </button>
              </div>
            </div>
          )
          : <></>}
      </div>
    </div>
  );
}
