import prisma from "./../../lib/prisma.js";
import {Auth} from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      if (authed) {
      const id = req?.headers.userid;
      const { title, description, img, createdAt } = req.body;
      const user = await prisma.User.findUnique({
        where: { id },
      });
        await prisma.Post.create({
          data: {
            title,
            description,
            img,
            createdAt,
            userId: id,
            username: user.username,
          },
        });
        res.status(200).send(200);
      }else{
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
