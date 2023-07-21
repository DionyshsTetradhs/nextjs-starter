import { query } from "./db.ts";
import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const key = req?.headers.key;
      const userID = req?.headers.userid;

      const data = await prisma.User.findUnique({
        where: { id: userID },
      });
      if (data.id == userID && data.s_key == key) {
        res.status(200).send(data.username);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Not authed!");
    }
  }
}
