import CheckEmail1 from "../components/auth/CheckEmail1";
import React from 'react'
//! Use global context to only render this page if a certain state value is active
//! Otherwise redirect to /
export default function verifyEmail() {
  return <CheckEmail1/>
}
