"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { Message } from "./types";
import { toPusherKey } from "./../../lib/utils"
import Pusher from "pusher-js";

const initialMessages: Message[] = [
  {
    id: 0,
    content: "...",
    author: "us",
  },
  {
    id: 1,
    content: "...",
    author: "them",
  },
];

// Define the interface for props
interface ChildProps {
  id: string,
  chatId: string;
}

const Chat: React.FC<ChildProps> = (props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [username, setUsername] = useState("");
  const receiverID = props.id;
  const chatId = props.chatId;

  useEffect(() => {
    const conv = async () => {
      try {
        const conversation = await axios({
          data: { receiverID },
          url: "./api/messeges/getConversation",
          method: "POST",
        });
        setMessages(conversation.data.clean_data);
        setUsername(conversation.data.username);
      } catch (error) {
      }
    };
    conv();
  }, []);

  
  useEffect(()=>{
  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,{cluster: "eu"})
  var channel = (pusher as any).subscribe(toPusherKey(`chat:${chatId}`));

    function messageHandler(){
      conv();
    }
    channel.bind('incoming-message', messageHandler)
    
    return()=>{
      channel.unsubscribe(`chat:${chatId}`)
      channel.unbind('incoming-message', messageHandler)
    }
  }, [messages])

  
  // var pusher:Pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,{cluster: "eu"})
  // var channel = (pusher as any).subscribe("my-channel");
  // channel.bind("my-event", function(data:any){
  //   alert(JSON.stringify(data));
  // });
  

  const conv = async () => {
    const conversation = await axios({
      data: { receiverID },
      url: "./api/messeges/getConversation",
      method: "POST",
    });
    setMessages(conversation.data.clean_data);
    setUsername(conversation.data.username);
  };

  const sendMessage = async (message:any) => {
    // setMessages([...messages, message]);
    try {
      await axios({
        data: { message, receiverID, chatId },
        url: "./api/messeges/send",
        method: "POST",
      });
      // await conv();
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="absolute bottom-0 right-0 z-[10]">
      <div className="bg-blue-500 bg-opacity-50 text-white text-center py-4 rounded-lg">
        <h1 className="text-4xl font-bold">{username}</h1>
      </div>
      <MessageList messages={messages} />
      <Input sendMessage={sendMessage} id={messages.length} />
    </div>
  );
};
export default Chat;
