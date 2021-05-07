import Head from "next/head";
import Image from "next/image";
import Form from "../components/form";

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
          <Form />
        </div>
      </main>
    </div>
  );
}
