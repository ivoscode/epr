import { useEffect, useState } from "react";
import { generateGUID } from "../../../helpers/helperFunctions";
import { ExternalNodeComponent } from "./ExternalNodeComponent";
export default function AvailableScreens() {
  const [screens, setScreens] = useState(null);
  const screensData = [
    {
      id: generateGUID(),
      title: "Referrals",
      url: "/client/forms/list?formid=referral",
      requiresClient: true,
    },
    {
      id: generateGUID(),
      title: "Menus list",
      url: "/configuration/menus/list",
      requiresClient: false,
    },
    {
      id: generateGUID(),
      title: "Menus builder",
      url: "/configuration/menus/builder",
      requiresClient: false,
    },
  ];
  useEffect(() => {
    setScreens(screensData);
  }, []);

  if (screens === null) {
    return null;
  }
  return (
    <div className="">
      <div className=" flex bg-gray-700 text-white p-2 rounded-md my-2">
        <ExternalNodeComponent node={{ id: generateGUID(), title: "FOLDER" }} />
      </div>
      <div className="flex flex-col">
        {screens?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-blue-300 text-black p-2 rounded-md my-2"
            >
              <ExternalNodeComponent node={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
