import React, { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import Slack from "../components/images/slack";
import Google from "../components/images/google";
import Github from "../components/images/github";
import classes from "../components/auth/signin.module.scss";
import useRedirectWhenOnline from "../helpers/hooks/useRedirectWhenOnline";
// This component won't render if we are logged in (will be redirected to /secret)
export default function signin() {
  // If online, redirect to /secret
  const { isLoading, loadedSession } = useRedirectWhenOnline("/secret");

  const signInHandler = function (e) {
    const providerName = e.target.title; // get provider name
    localStorage.setItem("provider", providerName);
    //% Make an API Route request to create new account info
    signIn(providerName);
  };
  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2>SIGN UP OR LOG IN</h2>

      <button onClick={signInHandler} className={classes.btn1} title="google">
        <Google />
        &nbsp;&nbsp;Continue with Google
      </button>
      <button onClick={signInHandler} className={classes.btn2} title="github">
        <Github />
        &nbsp;&nbsp;Continue with Github
      </button>
    </section>
  );
}
