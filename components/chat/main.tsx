import * as React from "react";
import { useState } from "react";
import axios from "axios";
// import { motion } from "framer-motion";
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
]
// Define the interface for props
interface ChildProps {
  id: string;
}
    
const  Chat: React.FC<ChildProps> = (props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [test, setTest] = useState(props.id);

  const removeMessage = (key: number) => {
    const newMessages = [...messages];
    newMessages.splice(newMessages.findIndex(({ id }) => id === key), 1);
    setMessages(newMessages);
  };

  const sendMessage = async (message: Message) =>{
    setMessages([...messages, message]);
    const data = await axios({
      // data: {message, prop.id, reciverId, createdAt};
      url: "./api/messeges/send",
      method: "POST",
    });
    
   } 

  return (
    <div className="absolute bottom-0 right-0 z-[10]">
    <h1>{test}</h1>
      <MessageList messages={messages} removeMessage={removeMessage} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};
export default Chat;
