"use-client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostExpand from "../components/post_expand";
import { FaHome } from "react-icons/fa";

export default function User() {
  const router = useRouter();
  const {
    query: {id, email, username, name, surname, picture },
  } = router;
  const props = {
    id,
    email,
    username,
    name,
    surname,
    picture,
  };

  const [isFriend, setIsFriend] = useState("Add friend");
  const [posts, setPosts] = useState([]);
  const friendID = props.id;
  const [togglePostExpand, setTogglePostExpand] = useState(false);
  const [postUsername, setPostUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
        
      try {
        const apiUrl = "./api/friends/check";
        const response = await axios({
          url: apiUrl,
          method: "POST",
          data: {storedKey, storedUserID, friendID },
        });
        setIsFriend(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      };
      if(props.id == undefined){
        setIsFriend("")
      }
      
      try {
        const result = await axios({
          url: "./api/search",
          method: "POST",
          data: {searchQuery: "user:" + props.username},
        });
        setPosts(result.data);
        return (result.data);
      } catch (err) {
        console.error(err);
      }
  }
    fetchData();
  },[]);
  
  


  function goHome(){
    router.push("/");
  }

  async function handleFriend(){
    const storedKey = localStorage.getItem("key");
    const storedUserID = localStorage.getItem("userID");
    try {
      const apiUrl = "./api/friends/handleRequest";
      const response = await axios({
        url: apiUrl,
        method: "POST",
        data: {storedKey, storedUserID, friendID, isFriend, friend_username:username },
      });
      setIsFriend(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    };
  }
  
  async function handlePostClick(
    post_id: string,
    username: string,
    title: string,
    description: string,
    img:string
  ) {
    setPostUsername(username);
    setPostTitle(title);
    setPostDescription(description);
    setPostId(post_id);
    setPictureUrl(img);
    setTogglePostExpand(true);
  }
  
  function handleTogglePostExpand() {
    setTogglePostExpand(!togglePostExpand);
    // document.querySelector("html").setAttribute("data-theme", "dark");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover">
      <PostExpand
        onChange={handleTogglePostExpand}
        togglePostExtend={togglePostExpand}
        post_id={postId}
        username={postUsername}
        title={postTitle}
        description={postDescription}
        pictureUrl={pictureUrl}
      />
      <div className="text-white rounded-xl bg-gray-800 bg-opacity-50 px-20 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        
          <div className="flex flex-col items-center">
            <button onClick={goHome} className="text-white text-center justify-center">
              <FaHome className="w-12 h-12 mb-4 text-center" />
            </button>
          </div>
        <div className="flex justify-center items-center">
            <h2 className="color-yellow-200 pl-4 text-center text-4xl">{props.username}</h2>
            <img
              src={props.picture}
              alt="pic"
              className="w-24 h-24 rounded-lg p-2"
            />
        </div>
            <button onClick={handleFriend} className="border-2 p-1 ml-9 rounded-lg bg-blue-500 text-white border border-white hover:border-blue-700 rounded">{isFriend}</button>
        <ul className="p-10">
          <li className="flex items-end ">
            
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Email:</p>
            <p className="color-yellow-200 pl-12">{props.email}</p>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Name:</p>
            <p className="color-yellow-200 pl-12">{props.name}</p>
          </li>
          <li className="flex items-end ">
            <p className="text-zinc-500	">Surname:</p>
            <p className="color-yellow-200 pl-7">{props.surname}</p>
          </li>
        </ul>
        
      <div className="flex flex-col p-4 gap-2 overflow-y-auto max-h-80">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() =>
              handlePostClick(
                post.id,
                post?.username,
                post?.title,
                post?.description,
                post?.img,
              )}
            className="p-2 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-100 text-white text-center"
          >
            <h1 className="font-bold text-2xl mb-2">{post.title}</h1>
            <p className="bg-white px-2 text-black rounded-full">{post.description}</p>
          </div>
          ))}
          </div>
        
      </div>
    </div>
  );
}
