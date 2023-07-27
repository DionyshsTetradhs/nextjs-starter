import prisma from "./../../../lib/prisma.js";
import {Auth} from "./../../../lib/auth";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      if (authed) {
        const id = req?.headers.userid;
        const {receiverID } = req.body;
        const data = await prisma.Messages.findMany({
          data: {
            sender_id: id,
            receiver_id: receiverID,
          },
        });
        res.status(200).send(data);
      }else{
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
