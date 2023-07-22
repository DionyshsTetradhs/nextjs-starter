import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  
  if (req.method == "GET") {
    try {

      const posts = await prisma.Post.findMany({
        take: 9,
      });

      res.status(200).json({ posts }); // send posts as response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
