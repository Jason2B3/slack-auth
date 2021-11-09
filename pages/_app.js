import "../styles/globals.css";
import AuthContextProvider from "../helpers/context-api/auth-context";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <AuthContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthContextProvider>
  );
}
