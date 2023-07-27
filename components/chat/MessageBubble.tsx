import * as React from "react";
import { Message } from "./types";

interface Props {
  id: Message["id"];
  content: Message["content"];
  author: Message["author"];
}

export const MessageBubble = ({ id, content }: Props) => {
  return (
    <div className="message-bubble" >
      {content}
    </div>
  );
};
