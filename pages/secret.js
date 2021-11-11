import React, { useRef, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { loginCheckSSR } from "../helpers/loginCheckSSR";
import classes from "../components/auth/secret.module.scss";

export async function getServerSideProps(context) {
  // Call a helper function to getSession without boiler plate
  // response equals a session object, or null
  const getSeshParam = { req: context.req };
  const response = await loginCheckSSR(getSeshParam);
  // If we're offline, redirect to /
  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // If we're online, then we let this page be visible
  return {
    props: { session: response }, // passes nothing
  };
}

// The component function only runs when we're logged in
export default function Secret(props) {
  console.log(props.session);
  // Get the provider name we logged in with from context api
  const providerName = localStorage.getItem("provider");
  const signOutHandler = function () {
    localStorage.removeItem("provider");
    signOut();
  };

  return (
    <div className={classes.container}>
      <h2>Currently logged in with the following provider: {providerName}</h2>
      <button onClick={signOutHandler}>Sign off</button>
    </div>
  );
}
