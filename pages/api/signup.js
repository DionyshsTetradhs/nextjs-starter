// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, pass } = req.body;
      await prisma.User.create({
        data: {
          username,
          email,
          password: pass,
          s_key: "",
          credit: 0,
          createdAt: new Date().toISOString(),
        },
      });
      return res.status(200).json("Signup:success");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}
