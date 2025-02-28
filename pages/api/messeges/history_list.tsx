import prisma from "./../../../lib/prisma.js";
import { Auth } from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { removeDuplicates } from "../../../lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
      const authed = await Auth([req.headers.key, req.headers.userid]);
      if (authed) {
        var m_id = req?.headers.userid;
        try {
          let data = await prisma.Messages.findMany({
            where: {
              OR: [
                { sender_id: m_id},
                { receiver_id: m_id},
              ],
            },
          });
          
          console.log(data);
          data = await removeDuplicates(data);
          console.log(data);

          // Create an array of promises for each getUsernameWithID call
          const promiseArray = data.map(async (item) => {
            if (item.receiver_id === m_id){
              var username_data = await getUsernameWithID(item.sender_id);
              var id = item.sender_id;
            }else{
              var username_data = await getUsernameWithID(item.receiver_id);
              var id = item.receiver_id;
            }
            return { id, username_data };
          });

          // Wait for all promises to resolve using Promise.all
          const newData = await Promise.all(promiseArray);

          res.status(200).send(newData);
        } catch (error) {
          console.error("Error while fetching data:", error);
          res.status(500).send("Internal Server Error");
        }
      } else {
        res.status(401).send("Not authed!");
      }
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}
