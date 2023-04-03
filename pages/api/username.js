import { query } from "./db";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const key = req?.headers.key;
      const userID = req?.headers.userid;

      // const data = await
      // const querySql =
      //   "SELECT * FROM user_cred WHERE session_key = ? AND user_ID = ?";
      // const data = await query({
      //   query: querySql,
      //   values: [key, userID],
      // });
      // const username = data.username;
      const username = data[0].username;
      res.status(200).send(username);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: error.message });
      res.status(500).send("Not authed!");
    }
  }
}
