import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";
export default function LinksComp(props) {
  const [data, setData] = useState();
  const title = props.data.title;
  const url = props.data.api;
  const id = props.clientId;

  useEffect(() => {
    getApiData("GET", `${url}?clientid=${id}`).then((x) => {
      setData(x);
    });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className=" flex-col flex justify-center items-center ">
      <h1>{title}</h1>
      <ul className="mt-5 text-blue-600">
        {data?.data.map((data, i) => {
          return (
            <li key={i} className="m-2">
              <a href="data.url">{data.text}</a>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
