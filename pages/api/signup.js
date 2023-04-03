// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, input1 } = req.body;
      await prisma.user.create({
        data: { username, email, password: input1, s_key: "" },
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
