import useAxios from "../../../hooks/useAxios";
export default function TableComp(props) {
  const title = props.data.title;
  const url = props.data.api;
  const id = props.clientId.clientid;

  const { response, error } = useAxios(`${url}?clientid=${id}`);

  if (error) {
    return <div>{error}</div>;
  }

  if (response == null) {
    return null;
  }

  if (response.data.orientation == `vertical`) {
    return (
      <div>
        <h1>{title}</h1>
        <table className="w-full mt-5 ">
          <tbody>
            {response &&
              response.data.headers.map((value, i) => {
                return (
                  <tr key={i} className="flex justify-between py-4">
                    <th className="">{value}</th>
                    {response.data.values.map((values, o) => {
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
              {response &&
                response.data.headers.map((value, i) => {
                  return <th key={i}>{value}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {response &&
              response.data.values.map((value, i) => {
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
