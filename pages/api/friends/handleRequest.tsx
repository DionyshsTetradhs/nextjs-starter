import prisma from "./../../../lib/prisma.js";
import {Auth} from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
      const { storedKey, storedUserID, friendID, isFriend} = req.body;
      const authed = await Auth([storedKey, storedUserID]);
      let isFriendResponse = isFriend;
      if (authed) {
        if (isFriend === "Add friend"){
          await prisma.Friendship.create({
            data: {
              user_id: storedUserID,
              createdAt: new Date().toISOString(),
              status: "Pending",
              friend_id: friendID,
            },
          });
          isFriendResponse = "Pending"
        }else if(isFriend === "Pending"){
        await prisma.Friendship.deleteMany({
          where: {
            OR: [
              {
                user_id: storedUserID,
                friend_id: friendID,
              },
              {
                user_id: friendID,
                friend_id: storedUserID,
              },
            ],
          },
        });
          isFriendResponse = "Add friend"
        }
        // if(){
        // await prisma.Friendship.update({
        //   where: {
        //     OR: [
        //       {
        //         user_id: storedUserID,
        //         friend_id: friendID,
        //       },
        //       {
        //         user_id: friendID,
        //         friend_id: storedUserID,
        //       },
        //     ],
        //   },
        //   data: {
        //       status:"Remove"
        //   },
        // });
        //   isFriendResponse = "Remove"
        // }
        
          res.status(200).send(isFriendResponse);
        }else{
          res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
