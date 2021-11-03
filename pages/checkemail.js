import React from "react";
import CheckEmail1 from "../components/auth/CheckEmail1";

function checkemail() {
  console.log(process.env.NEXT_PUBLIC_ALIAS)
  return <CheckEmail1 />;
}

export default checkemail;
