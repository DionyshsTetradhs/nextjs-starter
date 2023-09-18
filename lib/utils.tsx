import { Messag, Message } from "../components/chat/types";
import axios from "axios";
import prisma from "./prisma"

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

export function toPusherKey(key:string){
  return key.replace(/:/g, '__');
}

export async function removeDuplicates(data: Messag[]): Promise<Messag[]> {
  const newData: Messag[] = [];

  for (const item of data) {
    const exists = newData.some(
      (newItem) =>
        (newItem.receiver_id === item.receiver_id && newItem.sender_id === item.sender_id) ||
        (newItem.receiver_id === item.sender_id && newItem.sender_id === item.receiver_id)
    );

    if (!exists) {
      newData.push(item);
    }
  }

  return newData;
}

export async function searchPosts(search:string){
      try {
        const result = await axios({
          url: "./api/search",
          method: "POST",
          data:search
        });
        return(result.data);
      } catch (err) {
        console.error(err);
      }
}
