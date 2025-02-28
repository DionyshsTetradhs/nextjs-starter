import prisma from "./../../../lib/prisma.js";
import { Auth } from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';
import { pusherServer } from "../../../lib/pusher";
import { toPusherKey } from "../../../lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authed = await Auth([req?.headers.key, req?.headers.userid]);
  if (authed) {
    const id = req?.headers.userid;
    const { message, receiverID, chatId } = req.body;
    if (req.method == "POST") {
      pusherServer.trigger(toPusherKey(`chat:${chatId}`), "incoming-message",message)
      
      try {
        await prisma.Messages.create({
          data: {
            message: message.content,
            sender_id: id,
            receiver_id: receiverID,
            createdAt: new Date().toISOString(),
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500);
      }
      res.status(200).send(200);
    } else {
      res.status(401).send("Not authed!");
    }
  }
}
