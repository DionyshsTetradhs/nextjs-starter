import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  var rand = require("generate-key");
  const key = rand.generateKey(10);
  if (req.method == "POST") {
    try {
      const email = req?.body.email;
      const pass = req?.body.pass;
      const user = await prisma.User.findUnique({
        where: {
          email: email,
        },
      });
      const userID = user.id;
      if (user.password === pass) {
        await prisma.User.update({
          where: {
            email: email,
          },
          data: {
            s_key: key,
          },
        });
      } else {
        res.status(403).send("Check your password..");
      }
      res.status(200).send({ key, userID });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
