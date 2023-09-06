import prisma from "./../../lib/prisma.js";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const { username } = req.body;
      const user = await prisma.User.findUnique({
          where: {username:username},
      });
        res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
