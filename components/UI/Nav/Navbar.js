import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../../../context/index";

export default function Navbar() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  if (state.user.token == null) {
    return null;
  }

  return (
    <div className="flex items-center justify-evenly mb-10">
      <button
        onClick={() => {
          dispatch({ type: "LOGOUT" });
          router.push("/");
        }}
        className=" bg-pink-800 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
      >
        Logout
      </button>

      <ul className="flex">
        {state.user.data.map((link) => {
          return (
            <li key={link.id} className="mx-2">
              <a href={link.url}>
                <button className=" bg-blue-300 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
                  {link.title}
                </button>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="flex">
        <Link href="/client/search">
          <button className=" bg-green-700 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
            Search
          </button>
        </Link>
        <Link href="/client/dashboard-test">
          <button className=" bg-green-700 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
            Grid dashboard
          </button>
        </Link>
      </div>
      <div>{`Welcome  ${
        state.user.username && state.user.username.substring(0, 20)
      }`}</div>
    </div>
  );
}
