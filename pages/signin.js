import React from "react";
import SigninPrompt from "../components/auth/SigninPrompt";
import { callVerification } from "./api/loginCheck";

export async function getServerSideProps(context) {
  const response = await callVerification();
  const parsed= await response.json()
  return {
    props: { online: parsed },
    // no need for revalidate since SSR will fire again after each new request
  };
}

function signin({ online }) {
  console.log(online);
  return <SigninPrompt />;
}

export default signin;
