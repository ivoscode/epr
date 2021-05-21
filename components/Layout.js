import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../context/index";
import Navbar from "./UI/navigation/navbar";

export default function Layout(props) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (!state.user.token) {
      console.log("pushing to home");
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <main className="  mx-auto max-w-screen-2xl w-full mt-16   ">
        {state.user.token && props.children}
      </main>
    </div>
  );
}
