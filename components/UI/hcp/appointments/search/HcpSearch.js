import axios from "axios";
import { useState } from "react";
import HcpResults from "./HcpResults";

export default function ClientSearch({ handleAddHcp, closeModal }) {
  const [token, setToken] = useState();
  const [hcpId, setHcpId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hcpSearchResults, setHcpSearchResults] = useState([]);
  const params = {
    lastname: lastName,
    firstname: firstName,
    hcpid: hcpId,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("EprUser");
    const { token } = JSON.parse(user);
    setToken(token);

    try {
      const response = await axios.get(
        "https://web2.ajbsoftware.co.uk:5000/api/clients/search/",
        {
          params: {
            ...params,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setHcpSearchResults(response.data);
    } catch (e) {
      console.log(e.response);
      console.log(e);
      console.log(e.status);
    }
  };

  return (
    <div className="bg-gray-100  rounded-xl p-10">
      <div
        className="  bg-white border-gray-500 shadow-md overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto border-2 rounded-md p-6  "
      >
        <div>
          <p className="text-2xl pb-4">HCP Search</p>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col items-end  "
        >
          <div className="flex items-center mt-5 ">
            <div className=" mr-5 ">
              <label className=" text-gray-500 font-bold" htmlFor="Email">
                HCP ID
              </label>
            </div>
            <div className="">
              <input
                type="text"
                value={hcpId}
                onChange={(e) => setHcpId(e.target.value)}
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
                value={firstName}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
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

      <HcpResults
        hcpSearchResults={hcpSearchResults}
        handleAddHcp={handleAddHcp}
        closeModal={closeModal}
      />
    </div>
  );
}