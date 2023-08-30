import prisma from "./../../lib/prisma.js";
import { Auth } from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
      const { storedKey, storedUserID, username, hashedPassword } = req.body;
      const authed = await Auth([storedKey, storedUserID]);
      if (authed) {
        await prisma.User.update({
          where: {
            id: storedUserID,
          },
          data: {
            username: username,
            password: hashedPassword,
          },
        });
        res.status(200).send(200);
      } else {
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
