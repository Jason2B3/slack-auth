import React from "react";
import SigninPrompt from "../components/auth/SigninPrompt";
import loginCheckSSR from "../helpers/loginCheckSSR";

export async function getServerSideProps(context) {
  const response = await loginCheckSSR(context); // {online:Boolean}
  const loggedIn = response.online;
  if (loggedIn) {
    return {
      redirect: {
        destination: "/secret",
        permanent: false,
      },
    };
  }
  return {
    props: { loggedIn },
  };
}

function signin({ loggedIn }) {
  console.log(loggedIn);
  return <SigninPrompt />;
}

export default signin;
