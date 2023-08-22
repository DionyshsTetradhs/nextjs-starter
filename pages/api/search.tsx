import prisma from "./../../lib/prisma.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  var posts = [];
    try{
    const search = req.body.data;
      console.log(search,"search-top");
      
    if (search == ""){
      console.log("A");
      posts = await prisma.Post.findMany({
          take: 9,
        })
    }else{
      console.log("B");
      console.log(search,"search");

        posts = await prisma.Post.findMany({
          where: {
            description: search,
          }
      
      })
    }
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
