import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../../../context/index";

export default function Nav() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

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
      <div>{`Welcome user ${
        state.username && state.username.substring(0, 8)
      }`}</div>
    </div>
  );
}
