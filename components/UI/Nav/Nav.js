import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../../../context/index";

export default function Nav() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  if (state.user.username == null) {
    return null;
  }
  console.log(state);
  return (
    <div className="flex items-center justify-evenly">
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
          console.log(link);
          return (
            <li key={link.id} className="mx-2">
              <Link href={link.url}>
                <button className=" bg-blue-300 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
                  {link.title}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
      <div>{`Welcome  ${
        state.user.username && state.user.username.substring(0, 20)
      }`}</div>
    </div>
  );
}
