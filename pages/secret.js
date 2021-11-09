import React, { useRef, useEffect, useState } from "react";
import useRedirectWhenOffline from "../helpers/hooks/useRedirectWhenOffline";
import classes from "../components/auth/secret.module.scss";

function ProfileForm() {
  const { isLoading, loadedSession } = useRedirectWhenOffline("/");
  console.log(loadedSession);
  //! Should look different depending on our login method
  // Password change should only appear when we login with credentials
  // Represented by authMethod: "credentials" in context API

  //——————————————————————————————————————————————————————
  // Define refs to place the field inputs into our PATCH request
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const changeHandler = async function (e) {
    e.preventDefault();
    // Make a PATCH request to change-password.js's API route
    const response = await fetch(`/api/user/change-password`, {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // Use this to see the JSON message we get back
    console.log(await response.json());
  };
  return (
    <form className={classes.form}>
      <h1>Change Password:</h1>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={changeHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
