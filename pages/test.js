import useAxios from "../components/hooks/useAxios";
export default function Test() {
  const params = { firstname: "jacob" };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("EprUser");
    const { token } = JSON.parse(user);

    try {
      const { response } = useAxios(`/api/clients/search/`, params);
      // const response = await axios.get(
      //   "https://web2.ajbsoftware.co.uk:5000/api/clients/search/",
      //   {
      //     params: {
      //       ...params,
      //     },
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: token,
      //     },
      //   }
      // );
      console.log(response);
      //console.log("clients search results", response.data);
    } catch (e) {
      console.log(e.response);
      console.log(e);
      console.log(e.status);
    }
  };

  return (
    <div className="m-20">
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </div>
  );
}
