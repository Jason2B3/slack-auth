import { connectToDatabase } from "../../../helpers/db";
import { hashPW } from "../../../../helpers/auth";
// If the user submitted the correct 6 digit PIN, create an account 
export default async function handler(req, res) {

  if ((req.method = "POST")) {
    const { email, password } = req.body;
    const hashedPassword = await hashPW(password); // hash the password before storage

    // Connect to DB and grab the session
    const client = await connectToDatabase();
    const db = client.db();
    // Enter the "users" collection to make a new account doc
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword, // is hashed before insertion
    });
    client.close();
    res.status(201).json({ message: "Created user!" }); 
    
    //! WARNING: No error handling here yet
  }
}


