import React from "react";
import Slack from "../images/slack";
import classes from "./NoPW.module.scss";

export default function NoPW() {
  return (
    <section className={classes.container}>
      <Slack />
      <h2>Sign in without your password</h2>
      <p className={classes.p1}>
        We'll email you a link for password-free sign in to your workspaces
      </p>
      <div className={`${classes.container} ${classes.container2}`}>
        <label className={classes.left}>Email Address</label>
        <input className={classes.inp} placeholder="name@work-email.com" />
      </div>
      <button className={classes.btn3}>Continue</button>

      <span className={classes.p2}> OR </span>
      <button className={classes.btn4}>Reset your password</button>
    </section>
  );
}
