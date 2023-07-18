import * as React from "react";
import { Message } from "./types";

interface Props {
  id: Message["id"];
  content: Message["content"];
  author: Message["author"];
  removeMessage: (key: number) => void;
}

export const MessageBubble = ({ id, content, removeMessage }: Props) => {
  return (
    <div className="message-bubble" onClick={() => removeMessage(id)}>
      {content}
    </div>
  );
};
