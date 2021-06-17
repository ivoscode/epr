import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import {
  calcAge,
  formatDate,
  formatName,
  formatNhs,
} from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";

export default function ClientInfo({ id }) {
  const [client, setClient] = useState();

  useEffect(() => {
    if (isNaN(id)) {
      return;
    }

    getApiData("GET", `/api/client/get/?clientId=${id}`).then((x) => {
      setClient(x);
    });
  }, []);

  if (!client) {
    return null;
  }
  const {
    address: { line1, line2, line3, line4, line5, postcode },
    dob,
    gender: { description },
    name,
    nhs,
    telecom,
  } = client.data;

  return (
    <div className=" clientinfo w-full  mb-10 mx-auto  rounded-sm border-gray-700 border-2">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex justify-between">
              <div className="flex justify-between w-full p-3">
                <div>{formatName(name)}</div>
                <div className="flex flex-col sm:flex-row ">
                  <div className="ml-6 ">
                    <span className="font-light mr-2 text-gray-500 text-sm">
                      Born
                    </span>
                    <span className="font-bold">{formatDate(dob)}</span>
                    <span className="ml-1">{`(${calcAge(dob)}y)`}</span>
                  </div>

                  <div className="ml-6">
                    <span className="font-light mr-2 text-gray-500 text-sm">
                      Gender
                    </span>
                    <span className="font-bold">{description}</span>
                  </div>

                  <div className="ml-6">
                    <span className="font-light mr-2 text-gray-500 text-sm">
                      NHS No.
                    </span>
                    <span className="font-bold">{formatNhs(nhs)}</span>
                  </div>
                </div>
              </div>

              <Disclosure.Button className="flex justify-between items-center  px-2 py-2  text-white bg-gray-700  hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-8 h-8 text-white `}
                />
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className="flex justify-between w-full  px-10 py-3 text-sm font-medium text-left text-white  hover:bg-gray-50 ">
              <div className="flex flex-col sm:flex-row text-black justify-between w-full">
                <div className="mb-8 sm:mb-0">
                  <h1>Usual address</h1>
                  <div>{line1}</div>
                  <div>{line2}</div>
                  <div>{line3}</div>
                  <div>{postcode}</div>
                </div>
                <div className="mb-8 sm:mb-0">
                  <div>
                    <span>Home:</span> <span>020 599943</span>
                  </div>
                  <div>
                    <span>Work:</span>
                  </div>
                  <div>
                    <span>Mobile:</span>
                  </div>
                  <div>
                    <span>Email:</span>
                  </div>
                </div>
                <div className="mb-8 sm:mb-0">
                  <div>
                    <span>Latex</span> <span>14-Nov-1961</span>
                  </div>
                  <div>
                    <span>Peanuts</span>
                    <span>14-Nov-1961</span>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
