import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BusitionConsoleProvider } from "../components/context/context";
import BasicSpinner from "../components/Spinner/BasicSpinner";
import { prefix } from "../config/config";
import type { AppProps } from "next/app";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BusitionConsoleProvider value={{ prefix }}>
        <BasicSpinner />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <div className="scrollbar-hide">
            <Component {...pageProps} />
          </div>
        </GoogleOAuthProvider>
      </BusitionConsoleProvider>
    </RecoilRoot>
  );
}

export default MyApp;
