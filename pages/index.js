import React, { useState, useEffect } from "react";
import { signIn, signOut, getSession } from "next-auth/react";
import classes from "../components/auth/intro.module.scss";

export default function Home(props) {
  console.log(props);
  // Create/manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);

  //% If we are not logged in, redirect to /signi9n
  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      // WARNING: this method of redirecting resets our app (all state lost)
      if (!session) return;
      else setIsLoading(false); // update our loading state (we're done now)
    };
    confirmSession();
  }, []);

  return (
    <div className={classes.container}>
      <h1>Login status: {!loadedSession ? "offline" : "online"}</h1>
      {!loadedSession && <button onClick={() => signIn()}>Sign in</button>}
      {loadedSession && <button onClick={() => signOut()}>Sign out</button>}
    </div>
  );
}
