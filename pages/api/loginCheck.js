import { getSession } from "next-auth/react";


// No need for loading states like on the client side
// If we're loading, the webpage will just hold off on rendering for a bit
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (session) {
    res.status(200).json({ online: true });
    return;
  } else {
    res.status(200).json({ online: false });
    return;
  }
};


