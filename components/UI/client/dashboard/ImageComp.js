import useAxios from "../../../hooks/useAxios";
export default function ImageComp(props) {
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
  console.log(title);
  return (
    <div className=" flex-col flex justify-center items-center h-full">
      <h1>{title}</h1>
      <img className=" h-full" src={response && response.data.src} />
    </div>
  );
}
