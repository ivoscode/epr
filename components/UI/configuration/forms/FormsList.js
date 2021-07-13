import { TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "../../../../components/hooks/getApiData";
import MyDeleteDialog from "../../../Shared/alerts/MyDeleteDialog";

export default function FormsList() {
  const [forms, setForms] = useState(null);
  let [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message] = useState("Are you sure you want to delete?");
  const router = useRouter();

  useEffect(() => {
    getApiData("GET", `/api/forms/list`).then((x) => {
      setForms(x);
    });
  }, []);
  const handleDelete = (item) => {
    console.log("handle delete", item);
    const data = {
      id: item.id,
      title: item.title,
      structure: "",
      deleted: true,
    };
    getApiData("POST", `/api/forms/structure`, data).then((x) => {
      router.reload();
    });
  };

  if (forms === null) {
    return null;
  }

  return (
    <div>
      {/*-------alert box---------*/}
      <MyDeleteDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        message={message}
        handleDelete={handleDelete}
      />
      <div className="pb-20 mt-44 sm:mt-24 lg:mt-16 ">
        <div className="m-3 mb-36 rounded-md shadow-md mx-auto max-w-3xl border-2 border-gray-700">
          <div className="flex justify-between text-white bg-gray-800 px-4 py-2">
            {/*--------Form header---------*/}
            <div className="w-3/12 text-center">ID</div>
            <div className="w-3/12 text-center">Title</div>
            <div className="w-1/12"></div>
            <div className="w-1/12"></div>
          </div>
          {/*----------Form fields*/}
          <div>
            <ul>
              {forms?.data
                .filter((x) => x.deleted === false)
                .map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex justify-between border-b-2 items-center px-2 py-0.5 hover:bg-gray-100"
                    >
                      {/*----id------*/}
                      <div className="w-3/12 text-center ">{item.id}</div>
                      {/*----title------*/}
                      <div className="w-3/12 text-center">{item.title}</div>
                      {/*----select button------*/}
                      <div className="w-1/12 flex justify-center">
                        <button
                          className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8"
                          onClick={() => {
                            router.push(
                              `/configuration/forms/builder/?id=${item}`
                            );
                          }}
                        >
                          <ChevronRightIcon />
                        </button>
                      </div>
                      {/*----delete icon------*/}
                      <div className="w-1/12 flex justify-center">
                        <button
                          className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8 p-1.5"
                          onClick={() => {
                            setIsDialogOpen(item);
                            // handleDelete(item.id);
                          }}
                        >
                          <TrashIcon />
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
