import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";
export default function MenusBuilder() {
  const [menuItems, setMenuItems] = useState(null);
  console.log(menuItems);

  useEffect(() => {
    getApiData("GET", `/api/menus/roots`).then((x) => {
      setMenuItems(x.data);
    });
  }, []);
  if (menuItems == null) {
    return null;
  }
  return (
    <div className="w-full h-40 mt-10">
      {menuItems?.map((item) => {
        return (
          <div key={item.id} className="">
            {item.title}
          </div>
        );
      })}
    </div>
  );
}
