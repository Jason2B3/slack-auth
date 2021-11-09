import { connectToDatabase } from "../../../helpers/db";
import { hashPW } from "../../../helpers/auth";
//# API Route file
export default async function handler(req, res) {
  if ((req.method = "POST")) {
    // Extract data from the request body
    const { email, password } = req.body;
    const hashedPassword = await hashPW(password); // hash the password before storage
    // Access db instance
    const client = await connectToDatabase();
    const db = client.db();
    // Check if a user with the submitted email exists already
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res
        .status(422)
        .json({ message: "Account with this email exists already" });
      client.close();
      return;
    }
    //% Send an email to the submitted address with a 6 digit PIN
    //$ Create a 6 digit PIN:
    //$ Send the email containing it
    //$ Return a hashed version of the PIN to the front end along with the other login details
    const accountInfo={
      email,password, hashedPIN
    }
    client.close();
    res
      .status(201)
      .json({ message: "Sent a verification email", accountInfo });
  }
}
//! WARNING: No error handling here yet
