import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import {} from "next-firebase-auth/";
import React, { useState } from "react";
import firebase from "firebase";

const LoginPage = () => {
  const AuthUser = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center "></div>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(LoginPage);
