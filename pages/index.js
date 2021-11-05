import React, { useState, useEffect } from "react";
import { signIn, signOut, getSession } from "next-auth/react";
import useLoginCheck from "../helpers/hooks/useLoginCheck";
import classes from "../components/auth/intro.module.scss";

export default function Home(props) {
  // Use our custom hook that checks if we're loading or logged in
  const { isLoading, loadedSession } = useLoginCheck("/signin");

  return (
    <div className={classes.container}>
      <h1>Login status: {!loadedSession ? "offline" : "online"}</h1>
      {!loadedSession && <button onClick={() => signIn()}>Sign in</button>}
      {loadedSession && <button onClick={() => signOut()}>Sign out</button>}
    </div>
  );
}

