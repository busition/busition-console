import React, { useState } from "react";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import {} from "next-firebase-auth";
import firebase from "firebase";
import InputBox from "../../components/Input/InputBox";

const SignUp = () => {
  const regex = /^010\d{4}\d{4}$/;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });

  const formList: { state: string; setState: Function; name: string }[] = [
    { state: email, setState: setEmail, name: "email" },
    { state: password, setState: setPassword, name: "password" },
    { state: name, setState: setName, name: "name" },
    { state: phoneNumber, setState: setPhoneNumber, name: "phone number" },
  ];

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({
      type: "",
      msg: "",
    });
    if (!regex.test(phoneNumber)) {
      setErrorMsg({
        type: "전화번호 형식이 맞지 않습니다.",
        msg: "전화번호는 '-'를 빼고 01012345678 처럼 작성해주시기 바랍니다.",
      });
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (credential) => {
          const token = credential.user?.getIdToken();
          const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 1,
              phone_number: `+82${phoneNumber.substring(1)}`,
              user_name: name,
              user_email: email,
            }),
          });
          if (res.status != 200) {
            firebase.auth().signOut();
            setErrorMsg({
              type: "Failed to sign up",
              msg: "회원가입에 실패했습니다.",
            });
          }
        })
        .catch(async (error) => {
          const msg = await error;
          setErrorMsg({ type: "Failed to sign up", msg: error.message });
        });
    } catch (error: any) {
      setErrorMsg({ type: "Failed to sign up", msg: error.message });
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
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
            {errorMsg.type && (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  {errorMsg.type}
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>{errorMsg.msg}</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
