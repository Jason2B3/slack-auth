import React, { useEffect } from "react";
import Slack from "../images/slack";
import Google from "../images/google";
import Github from "../images/github";
import classes from "./SigninPrompt.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";

function SignupPrompt() {
  const { data: session } = useSession();
  if (session) {
    window.location.href = "/secret";
  }
  //% Link to OAuth provider using signIn("google") or something
  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2>
        Sign into the account
        <br /> you exited
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
        <input className={classes.inp} placeholder="name@work-email.com" />
        <label className={classes.left}>Password</label>
        <input className={classes.inp} placeholder="Your Password" />
        <button className={classes.btn3}>Continue</button>
      </div>
      <p>
        Have no account? <a href="/signin">Sign up now!</a>
      </p>
      <p>
        Forgot your password? <a>Get help signing in</a>
      </p>
      <p>
        Looking for another workspace? <a>Find your workspaces</a>
      </p>
    </section>
  );
}

export default SignupPrompt;
