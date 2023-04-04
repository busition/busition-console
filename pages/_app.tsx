import "../styles/globals.css";
import { BusitionConsoleProvider } from "../components/context/context";
import { prefix } from "../config/config";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <BusitionConsoleProvider value={{ prefix }}>
      <div className="scrollbar-hide">
        <Component {...pageProps} />
      </div>
          </BusitionConsoleProvider>

  );
}

export default MyApp;
