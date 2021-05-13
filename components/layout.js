import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../context/index";
import Nav from "./UI/Nav/Nav";

export default function Layout(props) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (state.username == null) {
      router.push("/");
    }
  }, [state.username]);

  return (
    <div className="flex flex-col w-full ">
      <Nav />
      <main className="  mx-auto max-w-screen-2xl w-full  ">
        {props.children}
      </main>
    </div>
  );
}
