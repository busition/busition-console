import React from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import styled from "styled-components";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div
      className="w-full text-center border-[2px] px-[8px] py-[4px] rounded border-gray-500 cursor-pointer"
      onClick={() => login()}
    >
      <h2>sign in with google</h2>
    </div>
  );
};

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="flex flex-col h-[50vh] w-[30vw] justify-center items-center min-h-[350px] min-w-[250px]">
        <h1 className="text-2xl mb-[10vh] font-bold">Sign in to Busition</h1>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
