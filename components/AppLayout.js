import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../context/index";
import Nav from "./UI/Nav/Navbar";

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
    <div className="flex flex-col w-full ">
      <Nav />
      <main className="  mx-auto max-w-screen-2xl w-full  ">
        {state.user.token && props.children}
      </main>
    </div>
  );
}
