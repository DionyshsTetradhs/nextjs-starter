export function Cleanup(req: any[], id:string) {
  interface Message {
    id: number;
    content: string;
    author: "us" | "them";
  }

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
