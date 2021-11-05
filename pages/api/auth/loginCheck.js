import { getSession } from "next-auth/react";

// No need for loading states like on the client side
// If we're loading, the webpage will just hold off on rendering for a bit
export default async function handler(req, res) {
  const session = await getSession(req.body);
  if (session) {
    res.status(200).json({ online: true });
    return;
  } else {
    res.status(200).json({ online: false });
    return;
  }
}

// We shouldn't fetch() in getServerSideProps,
// but we can call a helper function inside it that does fetch
export async function loginCheckSSR(getSeshParameter) {
  // Need full URL for this fetch or else we get an absolute path error
  const request = await fetch("http://localhost:3000/api/auth/loginCheck",{
    method: "POST",
    body: JSON.stringify(getSeshParameter), // the data we're storing
    headers: { "Content-Type": "application/json" },
  });
  const res = await request.json();
  return res.online;
}
