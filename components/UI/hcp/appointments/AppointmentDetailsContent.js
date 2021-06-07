import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import Modal from "../../../Modal";
import ClientInfo from "./ClientInfo";
import DropList from "./DropList";
import HcpInfo from "./HcpInfo";
import Search from "./search/Search";

export default function AppointmentDetailsContent() {
  const router = useRouter();
  ////////////////State////////////////
  const [resDetails, setResDetails] = useState({});
  const [client, setClient] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  console.log("response and save object", resDetails);
  console.log(client);
  ////////////Axios calls/////////////////

  const { response: categories } = useAxios(
    `/api/temp/configuration/appointmentcategories`
  );
  const { response: location } = useAxios(
    `/api/temp/configuration/appointmentcategories`
  );
  const { response: medium } = useAxios(
    `/api/temp/configuration/appointmentcategories`
  );

  const { response: details } = useAxios(
    `/api/appointment/details?id=${router.query.id}`
  );
  const { response, error, postData } = useAxiosPost(
    `/api/appointment/save`,
    resDetails
  );

  ////////////////
  useEffect(() => {
    setResDetails(details?.data);

    console.log(details);
  }, [details]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    router.back();
  };
  const handleRemoveClient = (id) => {
    const clients = resDetails.clients.filter((item) => item.id !== id);
    setResDetails({ ...resDetails, clients });
  };
  const handleRemoveHcp = (id) => {
    const hcps = resDetails.clients.filter((item) => item.id !== id);
    setResDetails({ ...resDetails, hcps });
  };
  const handleAddClient = () => {
    setIsModalOpened(true);
    const clients = resDetails.clients.concat({
      id: null,
      client: { id: client.id, description: client?.name?.first },
    });

    setResDetails({ ...resDetails, clients });
    console.log(clients);
  };
  if (!details) {
    return null;
  }
  return (
    <div className=" mt-20 bg-white border-gray-500 shadow-md  flex flex-col justify-center items-center max-w-2xl mx-auto border-2 rounded-md p-6  ">
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <Search setClient={setClient} closeModal={setIsModalOpened} />
      </Modal>

      <h1 className="text-left w-full m-4 font-semibold">Event Details</h1>

      <div className="flex justify-between items-center w-full">
        <div>Date/Time</div>
        <div>
          <input
            type="DATETIME-LOCAL"
            value={resDetails?.datetime || ""}
            onChange={(e) =>
              setResDetails({ ...resDetails, datetime: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full my-3">
        <div>Duration</div>
        <div>
          <input type="text" defaultValue={details.data.duration} />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Category</div>
        <div>
          <DropList
            options={categories?.data}
            selected={
              resDetails?.category || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setResDetails({ ...resDetails, category: e })}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Type</div>
        <div>
          <DropList
            options={categories?.data}
            selected={
              resDetails?.Type || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setResDetails({ ...resDetails, type: e })}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Location</div>
        <div>
          <DropList
            options={location?.data}
            selected={
              resDetails?.location || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setResDetails({ ...resDetails, location: e })}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Medium</div>
        <div>
          <DropList
            options={medium?.data}
            selected={
              resDetails?.medium || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setResDetails({ ...resDetails, medium: e })}
          />
        </div>
      </div>

      <ClientInfo
        data={resDetails?.clients}
        handleRemove={handleRemoveClient}
        handleAddClient={handleAddClient}
      />
      <HcpInfo data={resDetails?.hcps} handleRemove={handleRemoveHcp} />
      <div className=" mt-10 flex justify-between items-center w-full">
        <div>
          <label htmlFor="comments">Comments</label>
        </div>
        <div>
          <textarea
            className="shadow-sm  border-2 rounded-md"
            id="comments"
            name="comments"
            value={resDetails?.comment}
            onChange={(e) =>
              setResDetails({ ...resDetails, comment: e.target.value })
            }
            rows="4"
            cols="40"
          ></textarea>
        </div>
      </div>

      <div className="flex w-full justify-around">
        <div>
          <button
            onClick={handleSubmit}
            className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          >
            Save
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              router.back();
            }}
            className=" mt-8 bg-pink-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
