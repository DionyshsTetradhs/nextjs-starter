import {Auth} from "./../../../lib/auth";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const authed = await Auth([req?.headers.key,req?.headers.userid]);
      
      if (authed){
        console.log("he is authed");
      }else{
        console.log("not authed");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Not authed!");
    }
  }
}

