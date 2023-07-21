import * as React from "react";
import { useState } from "react";

let key = 2;

export const Input = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <form
      className="chat-input-container"
      onSubmit={e => {
        sendMessage({
          id: key++,
          content: message,
          author: "us"
        });
        setMessage("");
        e.preventDefault();
      }}
    >
      <input
        value={message}
        type="text"
        onChange={({ target }) => setMessage(target.value)}
      />
      <button></button>
    </form>
  );
};
