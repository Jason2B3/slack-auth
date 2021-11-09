import React, { useState, useEffect } from "react";
import { signIn, signOut, getSession } from "next-auth/react";
import useLoginCheck from "../helpers/hooks/useLoginCheck";
import useRedirectWhenOffline from "../helpers/hooks/useRedirectWhenOffline";
import useRedirectWhenOnline from "../helpers/hooks/useRedirectWhenOnline";
import classes from "../components/auth/intro.module.scss";
import Link from "next/link";

export default function Home(props) {
  // Use our custom hook that checks if we're loading or logged in
  //% Render different JSX based on our login status
  const { isLoading, loadedSession } = useLoginCheck();
  //% If we're offline, redirect to /signin
  // const { isLoading, loadedSession } = useRedirectWhenOffline("/signin");
  //% If we're online, redirect to /secret
  // const { isLoading, loadedSession } = useRedirectWhenOnline("/secret");
  return (
    <div className={classes.container}>
      <h1>Login status: {!loadedSession ? "offline" : "online"}</h1>
      {!loadedSession && <button onClick={() => signIn()}>Sign in</button>}
      {loadedSession && <button onClick={() => signOut()}>Sign out</button>}
      <Link href="/signin">Visit login page</Link>
      <Link href="/signup">Visit sign up page</Link>
      <Link href="/secret">Visit secret page- only works when logged in</Link>
    </div>
  );
}
