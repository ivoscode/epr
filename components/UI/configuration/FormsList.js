import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "../../../components/hooks/getApiData";
export default function FormsList() {
  const [forms, setForms] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getApiData("GET", `/api/forms/list`).then((x) => {
      setForms(x);
    });
  }, []);

  if (forms === null) {
    return null;
  }

  return (
    <div>
      <div className="pb-20 mt-44 sm:mt-24 lg:mt-16 ">
        <div className="m-3 mb-36 rounded-md shadow-md mx-auto max-w-3xl border-2 border-gray-700">
          <div className="flex justify-between text-white bg-gray-800 px-4 py-2">
            {/*--------Form header---------*/}
            <div className="w-3/12">ID</div>
            <div>Title</div>
            <div className="w-3/12"></div>
          </div>
          {/*----------Form fields*/}
          <div>
            <ul>
              {forms?.data
                .filter((x) => x.deleted === false)
                .map((data) => {
                  return (
                    <li
                      key={data.id}
                      className="flex justify-between border-b-2 items-center px-2 py-0.5 hover:bg-gray-100"
                    >
                      <div className="w-3/12 ">{data.id}</div>
                      <div className="">{data.title}</div>
                      <div className="w-3/12 flex justify-center">
                        <button
                          className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8"
                          onClick={() => {
                            router.push(
                              `/configuration/forms/builder/?id=${data.id}`
                            );
                          }}
                        >
                          <ChevronRightIcon />
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      {/*Bottom button*/}
      <div
        onClick={() => {
          router.push(`/configuration/forms/builder`);
        }}
        className=" backdrop-filter backdrop-blur-2xl w-full flex justify-center fixed bottom-1 right-1 left-1  py-4 "
      >
        <button className=" w-full  bg-gray-700 cursor-pointer  hover:bg-gray-900 text-white rounded-md  h-8 shadow-md mx-auto max-w-3xl">
          <div>ADD</div>
        </button>
      </div>
    </div>
  );
}
