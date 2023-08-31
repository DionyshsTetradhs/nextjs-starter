import prisma from "./../../lib/prisma.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
        const id = req?.headers.userid;
        const {friend_id} = req.body;
        try {
          await prisma.Chat.findFirst({
            where: {
              OR: [
                { user_id: id, friend_id: friend_id },
                { user_id: friend_id, friend_id: id },
              ],
            },
          });

          res.status(200).send("ChatID");
        } catch (error) {
          console.error("Error while fetching data:", error);
          res.status(500).send("Internal Server Error");
        }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
