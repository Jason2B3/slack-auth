import React, { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";

export default function UserProfile() {
  // Create/manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  console.log(isLoading, loadedSession);

  //% If we are not logged in, redirect to /signi9n
  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      // WARNING: this method of redirecting resets our app (all state lost)
      if (!session) window.location.href = "/signin"; 
      else setIsLoading(false); // update our loading state (we're done now)
    };
    confirmSession();
  }, []);
  const logoutHandler = () => signOut();

  if (isLoading) return <p>Loading...</p>;
  return (
    <section>
      <h1>
        Welcome to the secret page which can only be viewed by the authorized
      </h1>
      <h2>We are currently {loadedSession && "signed in"}</h2>
      <button onClick={logoutHandler}>Sign out</button>
    </section>
  );
}
