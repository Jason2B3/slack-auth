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
