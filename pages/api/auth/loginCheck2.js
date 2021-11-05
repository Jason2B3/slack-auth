import { getSession } from "next-auth/react";

// Move the logic that would be in the API route to this helper
export async function loginCheckSSR(getSeshParameter) {
  const session = await getSession(getSeshParameter);
  if (session) {
    return session; // a truthy 
  } else {
    return null;
  }
}

// The API route should call the helper, and that's it
export default async function handler(req, res) {
  const sessionObj= await loginCheckSSR() // equals null or an obj
  res.status(200).json(sessionObj)
}

// Need full URL for this fetch or else we get an absolute path error
// const request = await fetch("http://localhost:3000/api/auth/loginCheck",{
//   method: "POST",
//   body: JSON.stringify(getSeshParameter), // the data we're storing
//   headers: { "Content-Type": "application/json" },
// });
// const res = await request.json();
// return res.online;
