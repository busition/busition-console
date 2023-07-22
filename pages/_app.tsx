import "../styles/globals.css";
import { BusitionConsoleProvider } from "../components/context/context";
import { prefix } from "../config/config";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import initAuth from "../utils/initAuth";
import Script from "next/script";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BusitionConsoleProvider value={{ prefix }}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <div className="scrollbar-hide">
          <Component {...pageProps} />
        </div>
      </GoogleOAuthProvider>
    </BusitionConsoleProvider>
  );
}

export default MyApp;
