import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../context/index";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const credentials = { username, password };
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const handleSubmit = async (e, credentials) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("%c login API call", "background: #dc143c; color: #f0ffff");
      const response = await axios.post(
        "https://web2.ajbsoftware.co.uk:5000/api/session/create/",
        { ...credentials }
      );
      console.log(response);
      getRoutes(response.data.token, response.data.name, 1); //need hcp id from server from the first response

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getRoutes = async (token, name, hcpId) => {
    try {
      setLoading(true);
      const routes = await axios.get(
        "https://web2.ajbsoftware.co.uk:5000/api/user/menus",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const homeRoute = routes.data.find((o) => o.isHomePage === true);
      const user = { ...routes, token, username, name, homeRoute, hcpId };
      sessionStorage.setItem("EprUser", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      router.push(homeRoute.url);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.response);
    }
  };

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
          disabled={!username || !password || loading}
          className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
        >
          {loading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
}
