import React from "react";
import Slack from "../images/slack";
import Google from "../images/google";
import Github from "../images/github";
import classes from "./SignupPrompt.module.scss";

function SignupPrompt() {
  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2>First, enter your email</h2>
      <p className={classes.p1}>
        We suggest using the email address you use at work
      </p>
      <button className={classes.btn1}>
        <Google />
        &nbsp;&nbsp;Continue with Google
      </button>
      <button className={classes.btn2}>
        <Github />
        &nbsp;&nbsp;Continue with Github
      </button>
      <span className={classes.p2}> OR </span>
      <input className={classes.inp} placeholder="name@work-email.com" />
      <button className={classes.btn3}>Continue</button>

      <p>Already using Slack?</p>
      <a>Sign into an existing workplace</a>
    </section>
  );
}

export default SignupPrompt;
//! Make the anchor link elsewhere
