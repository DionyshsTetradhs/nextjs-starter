import prisma from "./../../../lib/prisma.js";
import {Auth} from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  async function getUsernameWithID(r_id: string) {
    try {
      const response = await prisma.User.findUnique({
        where: { id: r_id },
      });
      return response?.username;
    } catch (error) {
      console.error("Error while fetching username:", error);
      throw error;
    }
  }
  
  if (req.method == "POST") {
    try {
      const { storedKey, storedUserID, friendID, isFriend, friend_username} = req.body;
      const authed = await Auth([storedKey, storedUserID]);
      let isFriendResponse = isFriend;
      if (authed) {
        if (isFriend === "Add friend"){
          const user_username = await getUsernameWithID(storedUserID);
          await prisma.Friendship.create({
            data: {
              user_id: storedUserID,
              createdAt: new Date().toISOString(),
              status: "Pending",
              friend_id: friendID,
              friend_username,
              user_username: user_username
            },
          });
          isFriendResponse = "Pending"
        }else if(isFriend === "Pending" || isFriend === "Friend"){
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
        //       status:"Friend"
        //   },
        // });
        
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
