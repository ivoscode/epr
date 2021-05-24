import Head from "next/head";
import Image from "next/image";
import LoginForm from "../components/LoginForm";

export default function Home() {
  // const [status, setStatus] = useState("0");
  // useEffect(() => {
  //   const user = JSON.parse(window.localStorage.getItem("EprUser"));

  //   user && setStatus(user.status);
  // }, []);

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
