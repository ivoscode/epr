import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatTime } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
//displays available list of forms for a client

export default function FormsListContent() {
  const [forms, setForms] = useState();
  const router = useRouter();
  if (!router.query.formid || !router.query.clientid) {
    return null;
  }
  useEffect(() => {
    getApiData(
      "GET",
      `/api/forms/entries/?formid=${router.query.formid}&clientid=${router.query.clientid}`
    ).then((x) => {
      setForms(x);
    });
  }, []);

  if (!forms) {
    return null;
  }

  console.log("available client forms list", forms);

  console.log(router.query);

  return (
    <div className="m-3  rounded-md shadow-md mx-auto max-w-3xl border-2 border-gray-700">
      <div className="flex justify-between text-white bg-gray-700 px-4 py-2">
        <div className="w-3/12">Date/Time</div>
        <div>Entered By</div>
        <div className="w-3/12"></div>
      </div>
      <div>
        <ul>
          {forms?.data.map((data) => {
            return (
              <li
                key={data.id}
                className="flex justify-between border-b-2 items-center px-2"
              >
                <div className="w-3/12 ">{formatTime(data.entryDateTime)}</div>
                <div className="">{data.enteredBy.name}</div>
                <div className="w-3/12 flex justify-center">
                  <button
                    className=" flex items-center  bg-gray-700  hover:bg-gray-800 text-white rounded-md w-8 h-8"
                    onClick={() => {
                      router.push(
                        `/client/forms/entry/?formid=${router.query.formid}&clientid=${router.query.clientid}&id=${data.id}`
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
  );
}
