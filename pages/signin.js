import React from "react";
import SigninPrompt from "../components/auth/SigninPrompt";
import { loginCheckSSR } from "../helpers/loginCheckSSR";

export async function getServerSideProps(context) {
  // Call a helper function to getSession without boiler plate
  // response equals a session object, or null
  const getSeshParam = { req: context.req };
  const response = await loginCheckSSR(getSeshParam);
  // If we're logged in, redirect to /secret
  if (response) {
    return {
      redirect: {
        destination: "/secret",
        permanent: false,
      },
    };
  }
  // If we're offline, then we let this page be visible
  return {
    props: { offline: true },
  };
}

function signin(props) {
  console.log(props);
  return <SigninPrompt />;
}

export default signin;
