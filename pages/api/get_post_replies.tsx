import prisma from "./../../lib/prisma.js";
import { Auth } from "./../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
        const { post_id } = req.body;
        const data = await prisma.Post_replys.findMany({
          where: {
                post_id: post_id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      
        res.status(200).send( data );
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
