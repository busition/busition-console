import React, { useState } from "react";
import {} from "next-firebase-auth";
import InputBox from "../../components/Input/InputBox";
import { useRouter } from "next/router";
import { phoneRegex, pwRegex } from "../../utils/regex";

const SignUp = () => {
  const router = useRouter();
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
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMsg({
        type: "전화번호 형식이 맞지 않습니다.",
        msg: "전화번호는 '-'를 빼고 01012345678 처럼 작성해주시기 바랍니다.",
      });
      return;
    } else if (!pwRegex.test(password)) {
      setErrorMsg({
        type: "비밀번호 형식이 맞지 않습니다.",
        msg: "비밀번호는 특수문자와 숫자가 최소 하나 이상씩 포함되어 있어야 하며, 8-15자 사이여야 합니다.",
      });
      return;
    }
    fetch("/api/auth/users/?auth_type=Email", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        password: password,
        username: name,
        email: email,
        phone_number: phoneNumber,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json()).msg);
        }
        return res.json();
      })
      .then((data) => {
        if (data.status == "success") {
          router.replace("/login");
        }
      })
      .catch((error) =>
        setErrorMsg({ type: "회원가입 실패!", msg: error.message })
      );
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
