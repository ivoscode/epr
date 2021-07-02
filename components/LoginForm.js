import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../context/index";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const credentials = { username, password };
  const { dispatch } = useContext(Context);
  const router = useRouter();

  const handleSubmit = async (e, credentials) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("%c login API call", "background: #dc143c; color: #f0ffff");
      const response = await axios.post(
        "https://web2.ajbsoftware.co.uk:5000/api/session/create/",
        credentials
      );

      getRoutes(response.data.token, response.data.user, response.data.hcp);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getRoutes = async (token, user, hcp) => {
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
      console.log(routes.data);

      const userState = {
        navRoutes: routes.data.menus,
        token,
        user,
        hcp,
        homepage: routes.data.homepage,
      };
      sessionStorage.setItem("EprUser", JSON.stringify(userState));
      dispatch({ type: "LOGIN", payload: userState });
      router.push(routes.data.homepage);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
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
