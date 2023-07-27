import prisma from "./../../../lib/prisma.js";
import {Auth} from "./../../../lib/auth";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      if (authed) {
        const id = req?.headers.userid;
        const {message, userId, reciverId, createdAt } = req.body;
        await prisma.Messages.create({
          data: {
            message,
            userId: id,
            reciverId,
            createdAt,
          },
        });
        res.status(200);
      }else{
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
