import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const mongoURI= process.env.DATABASE_URL
  const client = await MongoClient.connect(mongoURI);
  return client;
} // no error handling used (warning)

// Will later interact with the slack-auth collection
