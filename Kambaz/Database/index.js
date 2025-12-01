// Kambaz/Database/index.js
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db("kambaz");   // your database name in Compass
    console.log("Connected to MongoDB → kambaz database");
  }
  return db;
}

export default await connect();
