import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { Message } from "./types";
// import "./styles.css";

const initialMessages: Message[] = [
  {
    id: 0,
    content: "Hey whats up",
    author: "us"
  },
  {
    id: 1,
    content: "Click a message to delete it!",
    author: "them"
  }
];

export default function Main (){
  const [messages, setMessages] = useState(initialMessages);

  const removeMessage = (key: number) => {
    const newMessages = [...messages];
    newMessages.splice(newMessages.findIndex(({ id }) => id === key), 1);
    setMessages(newMessages);
  };

  const sendMessage = (message: Message) => setMessages([...messages, message]);

  return (
    <div className="absolute bottom-0 right-0 z-[10]">
      <MessageList messages={messages} removeMessage={removeMessage} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};
