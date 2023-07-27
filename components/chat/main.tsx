import * as React from "react";
import { useState } from "react";
import axios, { Axios } from "axios";
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
  const receiverID = props.id;

  const conv = async (receiverID:string)=>{
    const conversation = await axios({
      data: {receiverID},
      url: "./api/messeges/getConversation",
      method: "GET",
    });
    return conversation;
  } 
  console.log("Yo yo yo !!",conv);
  
  const sendMessage = async (message: Message) =>{
    setMessages([...messages, message]);
    try{
    await axios({
      data: {message , receiverID},
      url: "./api/messeges/send",
      method: "POST",
    });
    }catch(error){
      console.error('Error sending message', error);
      return[];
    }
    
   } 

  return (
    <div className="absolute bottom-0 right-0 z-[10]">
      <MessageList messages={messages}/>
      <Input sendMessage={sendMessage}/>
    </div>
  );
};
export default Chat;
