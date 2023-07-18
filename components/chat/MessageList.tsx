import * as React from "react";
import { Message } from "./types";
import { MessageBubble } from "./MessageBubble";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  messages: Message[];
  removeMessage: (key: number) => void;
}

export const MessageList = ({ messages, removeMessage }: Props) => {
  return (
    <div className="messages-container">
      <AnimatePresence initial={false}>
        {messages.map(message => (
          <motion.div
            key={message.id}
            positionTransition
            className={`message-bubble-container ${message.author}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <MessageBubble
              key={message.id}
              {...message}
              removeMessage={removeMessage}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
