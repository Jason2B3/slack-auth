import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function useLoginCheck(redirectPath) {
  const router = useRouter();
  // Create and manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  //% If we are not logged in, redirect to a path specified by props
  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      // WARNING: this method of redirecting resets our app (all state lost)
      if (!session) {
        router.push(redirectPath);
      } else setIsLoading(false); // update our loading state (we're done now)
    };
    confirmSession();
  }, []);
  return { isLoading, loadedSession };
}

//# How we use the custom hook on the client-side
// isLoading=true (loading)   isLoading=false (not loading)
// loadedSession=falsy (offline)    loadedSession= session-object (online)
