import { Messag, Message } from "../components/chat/types";
import axios from "axios";

export function Cleanup(req: Messag[], id: string | string[]) {
  let clean_messages: Message[] = [];
  let j = 0;
  for (let value of req) {
    let author: "us" | "them";
    if (value.sender_id === id) {
      author = "us";
    } else {
      author = "them";
    }
    const new_value: Message = {
      id: j,
      content: value.message,
      author: author,
    };
    ++j;
    clean_messages = [new_value, ...clean_messages];
  }
  return (clean_messages);
}


export async function removeDuplicates(data: Messag[]) {
  const newData: Messag[] = [];

  for (const item of data) {
    const exists = newData.some((newItem) => newItem.receiver_id === item.receiver_id);
    if (!exists) {
      try {
        newData.push(item);
      } catch (error) {
        console.error("Error while getting username:", error);
      }
    }
  }

  return newData;
}

