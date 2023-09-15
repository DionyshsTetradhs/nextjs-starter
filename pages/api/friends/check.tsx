import prisma from "./../../../lib/prisma.js";
import {Auth} from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const { storedKey, storedUserID, friendID} = req.body;
      const authed = await Auth([storedKey, storedUserID]);
      if (authed) {
        console.log(storedUserID, friendID)
        const data = await prisma.Friendship.findFirst({
            where: {
              OR: [
                { user_id: storedUserID, friend_id: friendID },
                { user_id: friendID, friend_id: storedUserID },
              ],
            },
        });
        if(data == null){
          res.status(200).send("Add friend");
        }else{
          res.status(200).send(data.status);
        }
      }else{
        res.status(401).send("Not authed");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!");
    }
  }
}
