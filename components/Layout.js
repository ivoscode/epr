import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ClientInfo from "../components/UI/client/comp/ClientInfo";
import { Context } from "../context/index";
export default function Layout(props) {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      console.log("logging out from layout, missing state");
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  //Nav sits on top, this slides under and covers the whole page
  return (
    <div className=" w-full  h-full min-h-screen -mt-20 flex flex-col bg-main-bg-color">
      <main className="  mx-auto w-full max-w-8xl flex-1 pt-20 px-3 sm:px-6 lg:px-8   text-main-text-color  ">
        {router.query.clientid ? (
          <ClientInfo id={router.query.clientid} />
        ) : null}
        {state && props.children}
      </main>
    </div>
  );
}
