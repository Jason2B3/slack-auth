//# Used React PIN input library
//# https://www.npmjs.com/package/react-pin-input
import React, { useRef } from "react";
import PinInput from "react-pin-input";
import Slack from "../components/images/slack";
import classes from "../components/auth/verifyEmail.module.scss";

//! Use global context to only render this page if a certain state value is active
//! Otherwise redirect to /

function verifyEmail() {
  return (
    <section className={classes.container}>
      <Slack />
      <h2>Check your email for a code</h2>
      <p className={classes.p1}>
        We’ve sent a 6-character code to your submitted email.
        <br /> The code expires shortly, so please enter it soon.
      </p>

      <form className={classes.form}>
        <PinInput
          length={6}
          initialValue=""
          secret
          onChange={(value, index) => {
            //% value is the value of all entered chars in sequence
            console.log(value);
          }}
          type="string"
          inputMode="number"
          style={{ padding: "10px" }}
          inputStyle={{ borderColor: "black", width: "90px", height: "100px" }}
          inputFocusStyle={{ boxShadow: "0 0 5px rgba(81, 203, 238, 1)" }}
          onComplete={(value, index) => {}}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9]*$/}
        />
      </form>
    </section>
  );
}

export default verifyEmail;
