import * as React from "react";
import { useState } from "react";
import axios, { Axios } from "axios";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { Message } from "./types";

const initialMessages: Message[] = [
  {
    id:0, 
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

  async function conv(){
    const conversation = await axios({
      data: {receiverID},
      url: "./api/messeges/getConversation",
      method: "POST",
    });
    setMessages(conversation.data);
  } 
  
  const sendMessage = async (message: Message) =>{
    // setMessages([...messages, message]);
    try{
    const data = await axios({
      data: {message , receiverID},
      url: "./api/messeges/send",
      method: "POST",
    });
      await conv();
    }catch(error){
      console.error('Error sending message', error);
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
