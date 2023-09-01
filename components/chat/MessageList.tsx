import * as React from "react";
import { Message } from "./types";
import { MessageBubble } from "./MessageBubble";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  messages: Message[];
}

export const MessageList = ({ messages}: Props) => {
  const containerRef = React.useRef(null);

  // Function to scroll to the bottom of the container
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // Scroll to the bottom when the component renders or when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div ref={containerRef} className="border-t pt-4 overflow-y-auto max-h-80 text-center bg-blue-200 bg-opacity-75">
      <AnimatePresence initial={false}>
        {messages.map(message => (
          <motion.div
            key={message.id}
            className={`message-bubble-container ${message.author}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <MessageBubble
              key={message.id}
              {...message}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
