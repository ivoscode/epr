import Link from "next/link";
export default function Form() {
  return (
    <div className="flex flex-col justify-center  h-full">
      <div className="block mx-auto mb-10">
        <img src="/images/Logo-vertical.png" alt="Logo" width={300} />
      </div>
      <form className="flex flex-col items-center   ">
        <div className="w-2/3  mx-auto max-w-xs mb-8">
          <label className=" text-gray-500 font-bold" for="Email">
            Email
          </label>

          <div className=" mt-2  ">
            <input className=" w-full border-2 border-blue-300   rounded  py-2 px-4 " />
          </div>
        </div>
        <div className="w-2/3  mx-auto max-w-xs ">
          <div className="flex justify-between">
            <label className="  text-gray-500 font-bold" for="Password">
              Password
            </label>
            <span className="text-sm">Forgot Password?</span>
          </div>
          <div className=" mt-2 ">
            <input className=" w-full border-2 border-blue-300   rounded  py-2 px-4 " />
          </div>
        </div>

        <Link href="/main">
          <button className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
