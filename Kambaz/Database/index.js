// Kambaz/Database/index.js
import { MongoClient } from "mongodb";

const CONNECTION_STRING = 
  process.env.DATABASE_CONNECTION_STRING || 
  "mongodb://127.0.0.1:27017/kambaz";

const client = new MongoClient(CONNECTION_STRING);

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db("kambaz");
    console.log("Connected to MongoDB → kambaz database");
  }
  return db;
}

export default await connect();