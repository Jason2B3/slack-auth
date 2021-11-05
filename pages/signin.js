import React from "react";
import SigninPrompt from "../components/auth/SigninPrompt";
import { loginCheckSSR } from "./api/auth/loginCheck2";
import handler from "./api/auth/loginCheck2";

export async function getServerSideProps(context) {
  // Call a helper function to getSession without boiler plate
  // response equals a session object, or null
  const getSeshParam = { req: context.req };
  const response = await loginCheckSSR(getSeshParam); // {online:Boolean}
  console.log(response, "HERE");

  if (response) {
    return {
      redirect: {
        destination: "/secret",
        permanent: false,
      },
    };
  }
  return {
    props: { offline: true },
  };
}

function signin(props) {
  console.log(props);
  return <SigninPrompt />;
}

export default signin;
