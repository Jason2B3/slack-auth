import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function useLoginCheck() {
  // Create and manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  //% If we are not logged in, redirect to a path specified by props
  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      setIsLoading(false); // update our loading state (we're done now)
      // session equals null or a session object
    };
    confirmSession();
  }, []);
  return { isLoading, loadedSession };
}

//# How we use the custom hook on the client-side. IF...
// isLoading=true (we are loading)   isLoading=false (we are not loading)
// loadedSession=falsy (offline)    loadedSession= session-object (online)
