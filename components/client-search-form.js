import axios from "axios";
import { useEffect, useState } from "react";
import NoServer from "../components/no-server";
import ClientSearchResults from "./client-search-results";

export default function ClientSearchForm() {
  const [token, setToken] = useState();
  const [clientSearchResults, setClientSearchResults] = useState([]);

  useEffect(() => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://web2.ajbsoftware.co.uk:5000/api/clients/search/?lastname=something",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(response);
      setClientSearchResults(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <div className="">
      <div
        className="  bg-white border-gray-500 shadow-md overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto border-2 rounded-md p-6  "
      >
        <div>
          <p className="text-2xl pb-4">Client Search</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-end  ">
          <div className="flex items-center mt-5 ">
            <div className=" mr-5 ">
              <label className=" text-gray-500 font-bold" htmlFor="Email">
                Client ID
              </label>
            </div>
            <div className="">
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
              />
            </div>
          </div>

          <div className="flex items-center mt-5 ">
            <div className=" mr-5 ">
              <label className=" text-gray-500 font-bold" htmlFor="Email">
                NHS Number
              </label>
            </div>
            <div className="">
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
              />
            </div>
          </div>
          <div className="flex items-center mt-5 ">
            <div className=" mr-5 ">
              <label className=" text-gray-500 font-bold" htmlFor="Email">
                First Name
              </label>
            </div>
            <div className="">
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
              />
            </div>
          </div>
          <div className="flex  items-center mt-5 ">
            <div className=" mr-5 ">
              <label className=" text-gray-500 font-bold" htmlFor="Email">
                Last Name
              </label>
            </div>
            <div className="">
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
              />
            </div>
          </div>

          <div className="  w-full ">
            <button
              type="submit"
              className="  inline-block  mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <NoServer>
        <ClientSearchResults clientSearchResults={clientSearchResults} />
      </NoServer>
    </div>
  );
}
