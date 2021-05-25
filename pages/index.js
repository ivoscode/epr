import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { Context } from "../context/index";

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    console.log("executing home screen");
    const user = JSON.parse(window.localStorage.getItem("EprUser"));
    if (user) {
      setUser(user);
      dispatch({ type: "LOGIN", payload: user });
      console.log(user.homeRoute.url);
      router.push("/client/dashboard/");
    } else {
      window.localStorage.removeItem("EprUser");
    }
  }, [state]);

  if (user) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>EPR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:flex h-screen ">
        <div className=" relative  lg:w-1/2 hidden lg:block">
          <Image
            src="/SideImage_itrcv4.jpg"
            alt="Side Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
        <div className="lg:w-1/2 h-full">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
