import { useState } from "react";
import ManagementLayout from "../../../components/Layout/ManagementLayout";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");
  return (
    <ManagementLayout navigation="driver">
      <div className="w-full flex flex-col items-center mt-[32px]">
        <h1 className="text-lg font-bold">기사 아이디 생성</h1>
      </div>

      <div className="mt-10 lg:mx-auto lg:w-full lg:max-w-lg">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ID
            </label>
            <div className="mt-2">
              <input
                id="id"
                name="id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
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
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
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
              생성하기
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              무작위로 생성하기
            </button>
          </div>
        </form>
      </div>
    </ManagementLayout>
  );
}
