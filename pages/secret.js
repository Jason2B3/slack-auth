import React, { useRef, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { loginCheckSSR } from "../helpers/loginCheckSSR";
// import classes from "../components/auth/secret.module.scss";

export async function getServerSideProps(context) {
  // Call a helper function to getSession without boiler plate
  // response equals a session object, or null
  const getSeshParam = { req: context.req };
  const response = await loginCheckSSR(getSeshParam);
  // If we're not logged in, redirect to /
  if (!response) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // If we're offline, then we let this page be visible
  return {
    props: { online: true },
  };
}

// The component function only runs when we're logged in
export default function Secret() {
  // Get the provider name we logged in with from context api
  const providerName = localStorage.getItem("provider");
  const signOutHandler = function () {
    localStorage.removeItem("provider");
    signOut();
  };

  return (
    <div>
      <p>Currently logged in with the following provider: {providerName}</p>
      <button onClick={signOutHandler}>Sign off</button>
    </div>
  );
}
