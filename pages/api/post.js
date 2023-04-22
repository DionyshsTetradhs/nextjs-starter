import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const key = req?.headers.key;
      const id = req?.headers.userid;

      const { title, description, img, createdAt } = req.body;

      const user = await prisma.User.findUnique({
        where: { id },
      });
      console.log(user, "hello ma name is borat");

      if (user.id == id && user.s_key == key) {
        const data = await prisma.Post.create({
          data: {
            title,
            description,
            img,
            createdAt,
            userId: id,
            username: user.username,
          },
        });
        res.status(200).send("allgood");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Not authed!");
    }
  }
}
