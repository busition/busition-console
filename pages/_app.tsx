import "../styles/globals.css";
import { BusitionConsoleProvider } from "../components/context/context";
import { prefix } from "../config/config";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BasicSpinner from "../components/Spinner/BasicSpinner";
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import { getSpin } from "../utils/states";

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
