import * as React from "react";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Input } from "./Input";
import { MessageList } from "./MessageList";
import { Message } from "./types";
import { toPusherKey } from "./../../lib/utils"
import PusherClient from "pusher-js";

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
  id: string;
}

const Chat: React.FC<ChildProps> = (props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [username, setUsername] = useState("");
  const receiverID = props.id;

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

    PusherClient.subscribe(
      toPusherKey(`user:$(sessionId):incoming_friend_request`)
    )
    
  }, []);

  const conv = async () => {
    const conversation = await axios({
      data: { receiverID },
      url: "./api/messeges/getConversation",
      method: "POST",
    });
    setMessages(conversation.data.clean_data);
    setUsername(conversation.data.username);
  };

  const sendMessage = async (message: Message) => {
    // setMessages([...messages, message]);
    try {
      await axios({
        data: { message, receiverID },
        url: "./api/messeges/send",
        method: "POST",
      });
      await conv();
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
      <Input sendMessage={sendMessage} />
    </div>
  );
};
export default Chat;
