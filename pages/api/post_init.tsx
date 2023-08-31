import prisma from "./../../lib/prisma.js";
import { Auth } from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req.headers.key, req.headers.userid]);
      if (authed) {
        const id = req?.headers.userid;
        const {postid} = req.body;
        try {
          const data = await prisma.Post.findFirst({
            where: {
              id: postid,
            },
          });
          const poster_id = data.userId;
          const existingMessage = await prisma.Chat.findFirst({
            where: {
              OR: [
                { user_id: id, friend_id: poster_id },
                { user_id: poster_id, friend_id: id },
              ],
            },
          });

          if (!existingMessage) {
            await prisma.Chat.create({
              data: {
                user_id: id,
                friend_id: poster_id,
                createdAt:  new Date().toISOString(), 
                // Other columns and values
              },
            });
            // console.log("New chat log added");
          } else {
            // console.log("Chat already exists:", existingMessage);
          }

          res.status(200).send(200);
        } catch (error) {
          console.error("Error while fetching data:", error);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
