import prisma from "./../../../lib/prisma.js";
import { Auth } from "./../../../lib/auth";
import { Cleanup } from "../../../lib/messages_cleanup";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req?.headers.key, req?.headers.userid]);
      if (authed) {
        const id = req?.headers.userid;
        const { receiverID } = req.body;
        const data = await prisma.Messages.findMany({
          where: {
            sender_id: id,
            receiver_id: receiverID,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        const clean_data = Cleanup(data, id);
        res.status(200).send(clean_data);
      } else {
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
