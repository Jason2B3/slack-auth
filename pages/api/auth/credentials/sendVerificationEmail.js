import { connectToDatabase } from "../../../../helpers/db";
import { hashPW } from "../../../../helpers/auth";
import { sendEmail } from "../../../../helpers/sendEmail";
import * as securePin from "secure-pin";

export default async function handler(req, res) {
  if ((req.method = "POST")) {
    const { email } = req.body; // Extract data from payload
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

    // Create a 6 digit PIN and hash it
    var charSet = new securePin.CharSet();
    charSet.addUpperCaseAlpha().addNumeric().randomize();
    const PIN = securePin.generateStringSync(6, charSet);
    const hashedPIN = await hashPW(PIN);

    //% Send an email to the submitted address with the unhashed PIN
    const emailData = {
      targetEmail: email,
      subject: "Finish signing up to slack-auth",
      message: `Visit slack-auth/verifyEmail and enter in the following 6 digit code to finish the sign in process. ${String(PIN)}`,
    };
    const sendEmailReq = await sendEmail(emailData);
    //% ----------------------------------------------
    // Return hashed PIN to the front end so you can store it in auth-context.js
    client.close();
    res
      .status(201)
      .json({ message: "Sent a verification email", hashedPIN, sendEmailReq });
  }
}
//! WARNING: No error handling here yet
// Gnerated random PIN with https://www.npmjs.com/package/secure-pin
