import React from 'react'
import NoPW from "../components/auth/NoPW"
import Slack from '../components/images/slack';
import classes from "../components/auth/NoPW.module.scss";

function nopassword() {
  return (
    <section className={classes.container}>
      <Slack />
      <h2>Sign in without your password</h2>
      <p className={classes.p1}>
        We'll email you a link to reset your password
      </p>
      <div className={`${classes.container} ${classes.container2}`}>
        <label className={classes.left}>Email Address</label>
        <input className={classes.inp} placeholder="name@work-email.com" />
      </div>
      <button className={classes.btn3}>Reset your password</button>
    </section>
  );
}

export default nopassword
