import React, { useState } from "react";
import Link from "next/link";
import { jsonToFormEncoded } from "../../utils/functions";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { getSpin } from "../../utils/states";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });
  const [isSpin, setIsSpin] = useRecoilState(getSpin);
  const router = useRouter();
  const refUrl: string = router.query.ref as string;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg({
      type: "",
      msg: "",
    });
    setIsSpin(true);

    fetch("/api/auth/users/token?busition_platform=Busition-Console", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: jsonToFormEncoded({
        grant_type: "",
        username: email,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json()).detail);
        }
        return res.json();
      })
      .then((data: { access_token: string; token_type: string }) => {
        setIsSpin(false);
        if (hasCookie("token")) {
          deleteCookie("token");
        }
        setCookie("token", data.access_token);
        if (refUrl) {
          router.replace(refUrl);
        } else {
          router.replace("/console");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg({ type: "로그인 실패", msg: error.message });
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
          <Link href="/signup">
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Start a free trial
              </a>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
