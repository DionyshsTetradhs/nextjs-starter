"use client";
import React, { useState } from "react";

const Main = ({replies, onChange, togglePostExtend, username, title, description }) => {
  const [comments, setComments] = useState(replies);
  const [newComment, setNewComment] = useState("");
  const [visibility, setVisibility] = useState(true);

  const addComment = () => {
    console.log(replies);
    setComments(replies);
    if (newComment.trim() === "") return;
    setComments((prevComments) => [...prevComments, newComment]);
    setNewComment("");
  };

  const handleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <>
      {togglePostExtend
        ? (
          <div className="absolute center-div z-20 w-94 flex items-center justify-center">
            <button
              onClick={onChange}
              className="absolute top-3 right-[2%] bg-red-200 rounded-full transform translate-x-0 w-6"
            >
              X
            </button>
            <div className="flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white rounded-lg p-6 shadow-lg overflow-y-auto">
                <h2 className="text-xl text-center font-bold mb-4 pt-3">
                 {title} 
                </h2>
                <p className="absolute top-2 left-2 text-center text-white shadow-lg bg-blue-300 rounded-lg p-1">
                  {username}
                </p>
                <p className="mb-4 text-center">
                  {description}
                </p>
                <div className="border-t pt-4 overflow-y-auto max-h-80 text-center">
                  {comments.map((comment, index) => (
                    <div key={index} className="border-b pb-2 mb-2 text-center">
                      <p>
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
