import prisma from "./../../../lib/prisma.js";
import { Auth } from "./../../../lib/auth";
import { Cleanup } from "../../../lib/utils";
import { Message, Messag } from "../../../components/chat/types";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req.headers.key, req.headers.userid]);
      if (authed) {
        const id = req?.headers.userid;
        const { receiverID } = req.body;
        const data:Messag[] = await prisma.Messages.findMany({
          where: {
            sender_id: id,
            receiver_id: receiverID,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        let username = await prisma.User.findUnique({
          where:{
            id:receiverID
          }
        })
        username = username.username;
        const clean_data:Message[] = Cleanup(data, id);
        res.status(200).send({clean_data, username});
      } else {
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
