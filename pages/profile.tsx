"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { passwordStrength } from "check-password-strength";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import PostExpand from "../components/post_expand";

export default function Profile() {
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "./api/get_user";
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      const response = await axios({
        url: apiUrl,
        method: "POST",
        data: { storedKey, storedUserID },
      });
      setUsername(response.data.username);
      setName(response.data.name);
      setSurName(response.data.surname);
      setPictureUrl(response.data.picture);
      
      try {
        const requests = await axios({
          url: "./api/friends/listRequests",
          method: "POST",
          data: {storedKey, storedUserID },
        });
        setRequests(requests.data);
      } catch (err) {
        console.error(err);
      }
      
      try {
        const requests = await axios({
          url: "./api/friends/listFriends",
          method: "POST",
          data: {storedKey, storedUserID },
        });
        setFriends(requests.data);
      } catch (err) {
        console.error(err);
      }
      
      try {
        const result = await axios({
          url: "./api/search",
          method: "POST",
          data: {searchQuery: "user:" + response.data.username},
        });
        setPosts(result.data);
        return (result.data);
      } catch (err) {
        console.error(err);
      }
      
    };
    
    fetchData();
    return undefined;
  }, []);

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV, setPasswordV] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(true);
  const [passStrength, setPassStrength] = useState("");
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [picturePostUrl, setPicturePostUrl] = useState("");
  const [togglePostExpand, setTogglePostExpand] = useState(false);
  const [postUsername, setPostUsername] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  // const [pictureUrl, setPictureUrl] = useState("");
  const [postId, setPostId] = useState("");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  var passwordHash = require("password-hash");
  const router = useRouter();
  const uploader = Uploader({ apiKey: "public_W142iE2AjY4bCXCRYqGsKGyzDAm5" });

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassStrength(passwordStrength(e.target.value).value);
  };

  async function checkUsername(name: string) {
    const apiUrl = "./api/username_validation";
    try {
      const data = await axios({
        url: apiUrl,
        method: "POST",
        data: { username: name },
      });
      return data;
    } catch (err) {
      console.error(err.response);
    }
  }

  async function formSubmit(e: FormEvent) {
    e.preventDefault();
    if (password === passwordV && usernameValidation) {
      const hashedPassword: string = passwordHash.generate(password);
      const apiUrl = "./api/save_user";
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      await axios({
        url: apiUrl,
        method: "POST",
        data: { storedKey, storedUserID, username, hashedPassword, name, surName, pictureUrl},
      });
      router.push("/");
    } else {
      alert("Password is not the same or username exists!");
    }
  }

  async function handleChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    const result = await checkUsername(e.target.value);
    if (result.data === "") {
      setUsernameValidation(true);
    } else {
      setUsernameValidation(false);
    }
  }

  function goHome(){
    router.push("/");
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
    setPicturePostUrl(img);
    setTogglePostExpand(true);
  }
  
  function handleTogglePostExpand() {
    setTogglePostExpand(!togglePostExpand);
    // document.querySelector("html").setAttribute("data-theme", "dark");
  }

  function handleChangePasswordV(e: ChangeEvent<HTMLInputElement>) {
    setPasswordV(e.target.value);
  }

  async function handleAccept(request){
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      try {
        await axios({
          url: "./api/friends/acceptRequest",
          method: "POST",
          data: {storedKey, storedUserID, request},
        });
      } catch (err) {
        console.error(err);
      }
  }

  async function handleDecline(request){
      const storedKey = localStorage.getItem("key");
      const storedUserID = localStorage.getItem("userID");
      try {
        await axios({
          url: "./api/friends/declineRequest",
          method: "POST",
          data: {storedKey, storedUserID, request},
        });
      } catch (err) {
        console.error(err);
      }
  }
  
  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  
  function handleSurName(e: ChangeEvent<HTMLInputElement>) {
    setSurName(e.target.value);
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        
      <PostExpand
        onChange={handleTogglePostExpand}
        togglePostExtend={togglePostExpand}
        post_id={postId}
        username={postUsername}
        title={postTitle}
        description={postDescription}
        pictureUrl={picturePostUrl}
      />
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-20 py-4 shadow-lg backdrop-blur-md max-sm:px-0">
          <div className="flex flex-col items-center">
            <button onClick={goHome} className="text-white text-center justify-center">
              <FaHome className="w-12 h-12 mb-4 text-center" />
            </button>
          </div>
          <div className="text-white">
            <div className="flex flex-col items-center">
              <span className="text-gray-300">
                Change your profile information
              </span>
            </div>
    <div className="border border-blue-700 rounded-xl text-center">
              <h1 className="bg-yellow-600 rounded-xl">profile picture</h1>
              <div className="flex items-center justify-center">
      <img
        src={pictureUrl}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover"
      />
    </div>
   <UploadButton uploader={uploader}
                  options={{ multi: true }}
                  onComplete={files => setPictureUrl(files.map(x => x.fileUrl).join("\n"))}>
      {({onClick}) =>
        <button onClick={onClick}>
          Upload a file...
        </button>
      }
    </UploadButton>
  </div>
            <form
              onSubmit={formSubmit}
              className="flex flex-col items-center justify-center"
            >
              <div className=" text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  onChange={handleChangeUsername}
                  type="text"
                  name="email"
                  value={username}
                  placeholder="username"
                />
              </div>
              {usernameValidation
                ? <p className="errors text-green-800">valid</p>
                : <p className="errors text-red-800">taken</p>}
              <div className="mb-1 text-lg">
                <input
                  onChange={handleName}
                  className="flex justify-center items-center rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </div>
              <div className="mb-1 text-lg">
                <input
                  onChange={handleSurName}
                  className="flex justify-center items-center rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="sur_name"
                  placeholder="SurName"
                />
              </div>
              <div className="mb-1 text-lg">
                <input
                  onChange={handleChangePassword}
                  className="flex justify-center items-center rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  placeholder="New password"
                  required
                />
              </div>
              <p>{passStrength}</p>

              <div className="mb-4 text-lg">
                <input
                  onChange={handleChangePasswordV}
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  value={passwordV}
                  placeholder="Confirm password"
                />
              </div>
              <div className="flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </form>
            
          </div>
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
        <div className="absolute right-2 top-2">
          <h1 className="text-white bg-blue-400 rounded-full p-2">Friend Requests</h1>
          {requests.map((request)=>(
          <div key={request.id} className="bg-blue-900 rounded-full p-2 m-4">
              <h2 className="text-center text-white">{request.user_username}</h2>
              <button onClick={() => handleAccept(request)} className="bg-blue-200 rounded-full p-2">Accept</button>
              <button onClick={() => handleDecline(request)} className="bg-red-200 rounded-full p-2">Decline</button>
          </div>
          ))}
        </div>
        <div className="absolute left-2 top-2">
          <h1 className="text-white bg-blue-400 rounded-full p-2">Friends</h1>
          {friends.map((friend)=>(
          <div key={friend.id} className="rounded-full p-2 m-4 pl-0">
              <h2 className="text-center text-white bg-blue-900 rounded-full p-2">{friend.user_username}</h2>
          </div>
          ))}
        </div>
        
      </div>
    </>
  );
}
