"use client";
import React, { useState } from "react";

const Main = ({ onChange, togglePostExtend, openedPostId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [visibility, setVisibility] = useState(true);

  const addComment = () => {
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
                <h2 className="text-xl text-center font-bold mb-4">
                  Post Title
                </h2>
                <p className="mb-4 text-center">
                  {openedPostId}
                </p>
                <div className="border-t pt-4 overflow-y-auto max-h-80 text-center">
                  {comments.map((comment, index) => (
                    <div key={index} className="border-b pb-2 mb-2 text-center">
                      {comment}
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
