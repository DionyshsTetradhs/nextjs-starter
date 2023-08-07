import prisma from "./../../lib/prisma.js";
import {Auth} from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const userID = req?.body.userID;
      console.log("This is userID !!!!!!!!!", userID);
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      if (authed) {
        const data = await prisma.User.findUnique({
         where: { id: userID },
        });
        console.log(data);
        res.status(200).send(data.username);
      }else{
        res.status(401).send("Not authed");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!");
    }
  }
}
