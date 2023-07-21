import mysql from "mysql2/promise";

export async function query({ query, values }) {
  const dbconnection = await mysql.createConnection({
    host: "aws.connect.psdb.cloud",
    user: "z5wzdl30yh2g6n145pxp",
    password: "pscale_pw_8Kv3bp7cQP4ZJHqhJVI9wcGp8dIiXuESepYC08TEt11",
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
