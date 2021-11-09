import { connectToDatabase } from "../../../../helpers/db";
import { hashPW } from "../../../../helpers/auth";
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
    const PIN = await securePin.generateStringSync(6, charSet);
    const hashedPIN = await hashPW(PIN);

    //% Send an email to the submitted address with the unhashed PIN
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        message: PIN, // pin will be a part of the email
        target: email, // address to send email to
        reply_to: "no one", // a param we need for the email (See template)
      },
    };
    const sendEmailReq = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: { "Content-Type": "application/json" },
      }
    );
    // const emailAPIResponse = await JSON.parse(sendEmailReq);
    console.log(sendEmailReq);
    // if(sendEmailReq){

    // }
    // Return hashed PIN to the front end so you can store it in auth-context.js
    client.close();
    res.status(201).json({ message: "Sent a verification email", hashedPIN, sendEmailReq });
  }
}
//! WARNING: No error handling here yet
// Gnerated random PIN with https://www.npmjs.com/package/secure-pin
