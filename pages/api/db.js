import mysql from "mysql2/promise";

export async function query({ query, values }) {
  const dbconnection = await mysql.createConnection({
    host: "eu-central.connect.psdb.cloud",
    user: "jwfxpbne76xnt80oyrv0",
    password: "pscale_pw_lJLYvYiVV5HRifmrb2MHWCqM2p6FfgVPtPANyC9caJB",
    database: "social-network",
  });
  console.log("Dalksdjflkasdjfklasdjfklasdjfkljsfk");
  try {
    console.log("This is DB", query, values);
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error);
    return { error };
  }
}
