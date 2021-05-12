import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import useToken from "./hooks/useToken";

export default function LoginForm2() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const credentials = { username, password };
  const { token, setToken } = useToken();

  async function handleSubmit(e, credentials) {
    console.log(credentials);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://web2.ajbsoftware.co.uk:5000/api/session/create/",
        { ...credentials }
      );
      console.log(response.data);
      setToken(response.data);
    } catch (e) {
      console.log(e.response.data.Message);
    }
  }

  return (
    <div className="flex flex-col justify-center h-full">
      <form
        onSubmit={(e) => handleSubmit(e, credentials)}
        className="flex flex-col items-center   "
      >
        <div className="w-2/3  mx-auto max-w-xs mb-8">
          <label className=" text-gray-500 font-bold" htmlFor="Email">
            Username
          </label>

          <div className=" mt-2  ">
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
            />
          </div>
        </div>
        <div className="w-2/3  mx-auto max-w-xs ">
          <div className="flex justify-between">
            <label className="  text-gray-500 font-bold" htmlFor="Password">
              Password
            </label>
            <span className="text-sm">Forgot Password?</span>
          </div>
          <div className=" mt-2 ">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
            />
          </div>
        </div>

        <button
          type="submit"
          className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
        >
          Login
        </button>

        <Link href="first">
          <button
            type="text"
            className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          >
            Go to next page
          </button>
        </Link>
      </form>
    </div>
  );
}
