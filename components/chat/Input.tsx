import * as React from "react";
import { useState } from "react";

interface ChildProps {
  id: number,
  sendMessage: (messageData: { id: number; content: string; author: string }) => void;
}

export const Input: React.FC<ChildProps> = ({ sendMessage , id}) => {
  const [message, setMessage] = useState("");
  return (
    <form
      className="chat-input-container"
      onSubmit={e => {
        sendMessage({
          id: id,
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
