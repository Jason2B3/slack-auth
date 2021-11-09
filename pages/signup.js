import React from "react";
import Link from "next/link";
import Slack from "../components/images/slack";
import Google from "../components/images/google";
import Github from "../components/images/github";
import { getSession, signIn, signOut } from "next-auth/react";
import useRedirectWhenOnline from "../helpers/hooks/useRedirectWhenOnline";
import classes from "../components/auth/signup.module.scss";

function Signup() {
  // If online, redirect to /secret
  const { isLoading, loadedSession } = useRedirectWhenOnline("/secret");

  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2> SIGN UP PAGE<br/> Credentials or OAuth Provider</h2>

      <button onClick={() => signIn("google")} className={classes.btn1}>
        <Google />
        &nbsp;&nbsp;Continue with Google
      </button>
      <button onClick={() => signIn("github")} className={classes.btn2}>
        <Github />
        &nbsp;&nbsp;Continue with Github
      </button>
      <span className={classes.p2}> OR </span>

      <div className={`${classes.container} ${classes.container2}`}>
        <label className={classes.left}>Email Address</label>
        <input className={classes.inp} placeholder="name@work-email.com" />
        <label className={classes.left}>Password</label>
        <input className={classes.inp} placeholder="Your Password" />
        <button className={classes.btn3}>Continue with email and password</button>
      </div>

      <p>Already using Slack?</p>
      <Link href="/signin">Sign into an existing workplace</Link>
    </section>
  );
}

export default Signup;
//! Make the anchor link elsewhere

