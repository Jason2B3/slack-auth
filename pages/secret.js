import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/client";

export default function UserProfile() {
  // Create/manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  console.log(isLoading, loadedSession);

  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      // If getSession returns a falsy, we must not be logged in
      // In this case, redirect the visitor to to the /auth path for authentication
      // WARNING: this method of redirecting resets our app (all state lost)
      if (!session) alert("You are not logged in!");
      else setIsLoading(false); // update our loading state (we're done now)
    };
    confirmSession();
  }, []);
  const logoutHandler = () => signOut();

  if (isLoading) return <p className={classes.profile}>Loading...</p>;
  return (
    <section className={classes.profile}>
      <h1>We are currently {loadedSession && "signed in"}</h1>
      <button onClick={logoutHandler}>Sign out</button>
    </section>
  );
}
