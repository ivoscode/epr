import { useEffect, useState } from "react";
import { generateGUID } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
import { ExternalNodeComponent } from "./ExternalNodeComponent";
export default function AvailableScreens() {
  const [screens, setScreens] = useState(null);

  useEffect(() => {
    getApiData("GET", `/api/menus/screens`).then((x) => {
      setScreens(x.data);
    });
  }, []);

  if (screens === null) {
    return null;
  }
  return (
    <div className="">
      <div className=" flex bg-gray-700 cursor-move text-white p-2 rounded-md my-2">
        <ExternalNodeComponent node={{ id: generateGUID(), title: "FOLDER" }} />
      </div>
      <div className="flex flex-col">
        {screens?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-blue-300 cursor-move text-black p-2 rounded-md my-2"
            >
              <ExternalNodeComponent node={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
