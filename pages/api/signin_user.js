import { query } from "./db";
import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  var rand = require("generate-key");
  const key = rand.generateKey(10);
  if (req.method == "POST") {
    try {
      const email = req?.body.email;
      const pass = req?.body.pass;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user.password === pass) {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            s_key: key,
          },
        });
      } else {
        console.log("Check your password..");
      }
      const userID = user.id;
      res.status(200).send({ key, userID });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
