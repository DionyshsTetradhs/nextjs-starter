import prisma from "./../../lib/prisma.js";
import {Auth} from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      // const authed = await Auth([req?.headers.key,req?.headers.userid]);
      const authed = true;
      if (authed) {
        const username = req.body.username;
        const data = await prisma.User.findUnique({
          where: { username:username, },
        });
        res.status(200).send(data);
      }else{
        res.status(401).send("Not authed");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!");
    }
  }
}
