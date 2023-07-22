import prisma from "./../../lib/prisma.js";
import {Auth} from "./../../lib/auth";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const userID = req?.headers.userid;
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      if (authed) {
        const data = await prisma.User.findUnique({
         where: { id: userID },
        });
        res.status(200).send(data.username);
      }else{
        res.status(401).send("Not authed");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
