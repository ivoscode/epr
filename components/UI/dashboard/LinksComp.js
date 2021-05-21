import useAxios from "../../hooks/useAxios";
export default function LinksComp(props) {
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
  console.log(response);
  return (
    <div className=" flex-col flex justify-center items-center ">
      <h1>{title}</h1>
      <ul className="mt-5 text-blue-600">
        {response &&
          response.data.map((data, i) => {
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
