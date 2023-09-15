"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

const Main = ({post_id, onChange, togglePostExtend, username, title, description, pictureUrl }) => {
    const fetchData = async()=>{
      const apiUrl = "./api/get_post_replies";
      const response = await axios({
        url: apiUrl,
        method: "POST",
        data: {post_id},
      });
      setComments(response.data);
    }
  useEffect(() => {
    const fetchData = async()=>{
      const apiUrl = "./api/get_post_replies";
      const response = await axios({
        url: apiUrl,
        method: "POST",
        data: {post_id},
      });
      setComments(response.data);
    }
    fetchData();
    // let variable = [];
    // variable.push(...data);
    // setComments(variable);
    return () => { }
  }, [togglePostExtend])
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [visibility, setVisibility] = useState(true);
  const router = useRouter()
  
  async function addComment(){
    if (newComment.trim() === "") return;
    try{
    await axios({
      url: "./api/post_reply",
      method: "POST",
      data: {
        reply:newComment,
        postId:post_id,
        createdAt: new Date().toISOString(),
        img: "hello",
      },
    });
    }catch(error){
      console.error('Error posting post', error);
    }
    fetchData();
    setNewComment("");
  };

  // const handleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   setVisibility(!visibility);
  // };

  async function handleUsernameClick (event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        try {
          const apiUrl = "./api/get_user_profile";
          const response = await axios({
            url: apiUrl,
            method: "POST",
            data: { username },
          });
          const data = response.data;
          router.push({
          // '/user/' + "'" + data.username + data.name + data.email + data.picture + "'")
            pathname:'/user',
            query:{id:data.id, email:data.email, username:data.username, name:data.name, surname:data.surname,  picture:data.picture},
                      })
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
  }

  return (
    <>
      {togglePostExtend
        ? (
          <div className="absolute flex flex-row m-1 mt-40 md:m-40 z-20">
              <div className="flex ">
      <img
        src={pictureUrl}
        alt="pic"
        className="w-46 h-46 rounded-lg object-cover"
      />
    </div>
            <button
              onClick={onChange}
              className="absolute top-3 right-[2%] bg-red-200 rounded-full transform translate-x-0 w-6"
            >
              X
            </button>
            <div className="flex flex-row bg-gray-500 bg-opacity-50">
              <div className="bg-white rounded-lg p-6 shadow-lg overflow-y-auto">
                <h2 className="text-xl text-center font-bold mb-4 pt-3">
                 {title} 
                </h2>
                <button onClick={handleUsernameClick}>
                <p className="absolute top-2 left-2 text-center text-white shadow-lg bg-blue-300 rounded-lg p-1">
                  {username}
                </p>
                </button>
                <p className="mb-4 text-center">
                  {description}
                </p>
                <div className="border-t pt-4 overflow-y-auto max-h-80 text-center">
                  {comments.map((comment, index) => (
                    <div key={index} className="grid grid-cols-3 items-center justify-center h-full gap-4 border-b pb-2 mb-2 text-center">

                      <p className="rounded-lg bg-blue-300 p-4">
                      {comment.username}
                      </p>
                      <p className="text-center">
                      {comment.reply}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="text-center w-full px-3 py-2 border rounded"
                  />
                  <button
                    className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={addComment}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        : <></>}
    </>
  );
};
export default Main;
