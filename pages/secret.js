import React, { useEffect, useState } from "react";
import ProfileForm from "../components/auth/profileform";
import useRedirectWhenOffline from "../helpers/hooks/useRedirectWhenOffline";

export default function SecretPage() {
  const { isLoading, loadedSession } = useRedirectWhenOffline("/");
  console.log(loadedSession);
  //! Should look different depending on our login method
  // Password change should only appear when we login with credentials
  // Should not appear if we login with OAuth
  return <ProfileForm />;
}
