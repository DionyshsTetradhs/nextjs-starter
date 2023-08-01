import { Message, Messag } from "../components/chat/types";

export function Cleanup(req: Messag[], id:string) {

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
    clean_messages = [new_value, ...clean_messages ];
  }
  return (clean_messages);
}
