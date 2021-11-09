import React, { useRef } from "react";
import Link from "next/link";
import Slack from "../components/images/slack";
import Google from "../components/images/google";
import Github from "../components/images/github";
import { getSession, signIn, signOut } from "next-auth/react";
import useRedirectWhenOnline from "../helpers/hooks/useRedirectWhenOnline";
import classes from "../components/auth/signup.module.scss";

function Signup() {
  const emailInput = useRef();
  const passwordInput = useRef();
  // If online, redirect to /secret
  const { isLoading, loadedSession } = useRedirectWhenOnline("/secret");
  
  const submitHandler = async function () {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    let hashedPIN = null;
    //% Make a request to sendVerificationEmail API route
    const res = await fetch("/api/auth/credentials/sendVerificationEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const parsed = await res.json(); // returns a hashed PIN if successful
    if (parsed.hashedPIN) hashedPIN = parsed.hashedPIN; //! TEST OUT CODE UNTIL HERE
    
    //% Create an account info obj then save it to auth-context.js
    const accountInfo = { email, password, hashedPIN };
    // setAuthMethod: "credentials"
    //% Reroute to /verifyEmail, where we have a chance to create an account
    console.log(accountInfo)

  };
  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2>
        {" "}
        SIGN UP PAGE
        <br /> Credentials or OAuth Provider
      </h2>

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
        <input
          ref={emailInput}
          className={classes.inp}
          placeholder="name@work-email.com"
        />
        <label className={classes.left}>Password</label>
        <input
          ref={passwordInput}
          className={classes.inp}
          placeholder="Your Password"
        />
        <button onClick={submitHandler} className={classes.btn3}>
          Sign up with email & password
        </button>
      </div>

      <p>Already using Slack?</p>
      <Link href="/signin">Sign into an existing workplace</Link>
    </section>
  );
}

export default Signup;
//! Make the anchor link elsewhere
