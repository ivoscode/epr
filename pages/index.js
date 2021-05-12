import Head from "next/head";
import Image from "next/image";
import LoginForm2 from "../components/login-form2";

export default function Home() {
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
          {/* <LoginForm />*/}
          <LoginForm2 />
        </div>
      </main>
    </div>
  );
}
