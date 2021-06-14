import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";

export default function TableComp(props) {
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

  if (data?.data.orientation == `vertical`) {
    return (
      <div>
        <h1>{title}</h1>
        <table className="w-full mt-5 ">
          <tbody>
            {data?.data.headers.map((value, i) => {
              return (
                <tr key={i} className="flex justify-between py-4">
                  <th className="">{value}</th>
                  {data?.data.values.map((values, o) => {
                    return (
                      <td className=" " key={o}>
                        {values[i]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              {data?.data.headers.map((value, i) => {
                return <th key={i}>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data?.data.values.map((value, i) => {
              return (
                <tr key={i}>
                  {value.map((value, o) => {
                    return (
                      <td className="pt-5" key={o}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
