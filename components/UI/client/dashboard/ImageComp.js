import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";

export default function ImageComp(props) {
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
    <div className=" flex-col flex justify-center items-center h-full">
      <h1>{title}</h1>
      <img className=" h-full" src={data?.data.src} />
    </div>
  );
}
