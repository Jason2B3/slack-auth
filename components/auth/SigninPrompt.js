import React, { useEffect, useRef } from "react";
import Slack from "../images/slack";
import Google from "../images/google";
import Github from "../images/github";
import classes from "./SigninPrompt.module.scss";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import useRedirectWhenOnline from "../../helpers/hooks/useRedirectWhenOnline";

// This component won't render if we are logged in (will be redirected to /secret)
function SignupPrompt() {
  // If online, redirect to /secret
  const { isLoading, loadedSession } = useRedirectWhenOnline("/secret");
  const emailRef = useRef();
  const passwordRef = useRef();
  async function submitHandler(e) {
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const result = await signIn("credentials", {
      // prevents authorize FN from redirecting to a new page if an error occurs
      redirect: false,
      email: enteredEmail, // will equal credentials.email in the backend
      password: enteredPassword, // will equal credentials.password in the backend
    });
    console.log(result); // just log how our login went for now
  }

  return (
    <section className={classes.container}>
      <Slack className={classes.svg} />
      <h2>SIGN IN PAGE</h2>
      <button onClick={() => signIn("google")} className={classes.btn1}>
        <Google />
        &nbsp;&nbsp;Continue with Google
      </button>
      <button onClick={() => signIn("github")} className={classes.btn2}>
        <Github />
        &nbsp;&nbsp;Continue with Github
      </button>
      <span className={classes.p2}> OR </span>
      <form className={`${classes.container} ${classes.container2}`}>
        <label className={classes.left}>Email Address</label>
        <input
          ref={emailRef}
          className={classes.inp}
          placeholder="name@work-email.com"
        />

        <label className={classes.left}>Password</label>
        <input
          ref={passwordRef}
          className={classes.inp}
          placeholder="Your Password"
        />

        <button onClick={submitHandler} className={classes.btn3}>
          Continue
        </button>
      </form>
      <p>
        Have no account? <Link href="/signup">Sign up now!</Link>
      </p>
      <p>
        Forgot your password?{" "}
        <Link href="/forgotpassword">Get help signing in</Link>
      </p>
    </section>
  );
}

export default SignupPrompt;
