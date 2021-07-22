import { ChevronRightIcon } from "@heroicons/react/solid";
import format from "date-fns/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatTime } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";

//displays available list of forms for a client

export default function FormsListContent() {
  const [forms, setForms] = useState();
  const [extraFields, setExtraFields] = useState([]);
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

    getApiData(
      "GET",
      `/api/forms/structure/?id=${router.query.formid}&datetime=${format(
        new Date(),
        "yyyy-MM-dd'T'HH:mm"
      )}`
    ).then((x) => {
      let components = JSON.parse(x.data.structure).components;
      let filtered = components.filter((x) => x.attributes.listview === "true");

      setExtraFields(filtered);
    });
  }, []);

  if (!forms) {
    return null;
  }

  console.log("available client forms list", forms);

  console.log(router.query);

  return (
    <div>
      <div className="pb-20 mt-44 sm:mt-24 lg:mt-16 ">
        <div className="m-3 mb-36 rounded-md shadow-md mx-auto max-w-3xl border-2 border-gray-700">
          <div className="flex justify-between text-white bg-gray-800 px-4 py-2">
            <div className="w-3/12">Date/Time</div>
            <div>Entered By</div>
            {extraFields.map((x) => (
              <div>{x.label}</div>
            ))}
            <div className="w-3/12"></div>
          </div>
          <div>
            <ul>
              {forms?.data.map((data) => {
                return (
                  <li
                    key={data.id}
                    className="flex justify-between border-b-2 items-center px-2 py-0.5 hover:bg-gray-100"
                  >
                    <div className="w-3/12 ">
                      {formatTime(data.entryDateTime)}
                    </div>
                    <div className="">{data.enteredBy.name}</div>

                    {console.log(data)}
                    {extraFields.map((x, index) => (
                      <div className="">{data[x.key] || "undefined"}</div>
                    ))}

                    <div className="w-3/12 flex justify-center">
                      <button
                        className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8"
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
      </div>
      {/*Bottom button*/}
      <div
        onClick={() => {
          router.push(
            `/client/forms/entry/?formid=${router.query.formid}&clientid=${router.query.clientid}`
          );
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
