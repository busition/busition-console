import React, { useState } from "react";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import {} from "next-firebase-auth";
import styled from "styled-components";
import firebase from "firebase";
import InputBox from "../../components/Input/InputBox";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const formList: { state: string; setState: Function; name: string }[] = [
    { state: email, setState: setEmail, name: "email" },
    { state: password, setState: setPassword, name: "password" },
  ];

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div>
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Join us
        </h1>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignUpSubmit}>
          {formList.map((item, idx) => (
            <InputBox
              id={item.name}
              setStateFunction={item.setState}
              type={
                item.name == "email" || item.name == "password"
                  ? item.name
                  : "text"
              }
              state={item.state}
              key={item.name}
            />
          ))}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(SignUp);
