import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import Modal from "../../../Modal";
import ClientInfo from "./ClientInfo";
import DropList from "./DropList";
import HcpInfo from "./HcpInfo";
import ClientSearch from "./search/ClientSearch";
import HcpSearch from "./search/HcpSearch";

export default function AppointmentDetailsContent() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("EprUser"));
  ////////////////State////////////////
  const [resDetails, setResDetails] = useState({
    clients: [],
    hcps: [
      {
        hcp: { id: user.hcpId, description: user.name },
      },
    ],
    duration: 30,
    comment: "",
    //datetime: router.query.datetime,
    id: null,
  });
  const [isClientModalOpened, setIsClientModalOpened] = useState(false);
  const [isHcpModalOpened, setIsHcpModalOpened] = useState(false);
  console.log("response and save object", resDetails);

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
    router.query.id && `/api/appointment/details?id=${router.query.id}`
  );
  const {
    response: postDataResponse,
    error,
    postData,
  } = useAxiosPost(`/api/appointment/save`, resDetails);

  /////////////////////////
  useEffect(() => {
    if (details) {
      setResDetails(details.data);
    }
    if (router.query.datetime) {
      setResDetails({ ...resDetails, datetime: router.query.datetime });
    }
  }, [details, router.query.datetime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    postData();
    console.log(postDataResponse);
    router.back();
  };

  ///////////Adding and removing clients and hcp////
  const showClientSearchModal = () => {
    setIsClientModalOpened(true);
  };
  const showHcpSearchModal = () => {
    setIsHcpModalOpened(true);
  };

  const handleAddClient = (client) => {
    if (resDetails.clients.find((item) => item.client.id == client.id)) {
      return;
    }

    const clients = resDetails.clients.concat({
      client: {
        id: client.id,
        description:
          client.name.title + ` ` + client.name.first + ` ` + client.name.last,
      },
    });
    console.log(clients);
    setResDetails({ ...resDetails, clients });
  };

  const handleRemoveClient = (id) => {
    const clients = resDetails.clients.filter((item) => item.client.id !== id);
    setResDetails({ ...resDetails, clients });
  };
  const handleAddHcp = (hcp) => {
    if (resDetails.hcps.find((item) => item.hcp.id == hcp.id)) {
      return;
    }

    const hcps = resDetails.hcps.concat({
      hcp: {
        id: 2,
        description:
          hcp.name.title + ` ` + hcp.name.first + ` ` + hcp.name.last,
      },
    });
    console.log(hcps);
    setResDetails({ ...resDetails, hcps });
  };

  const handleRemoveHcp = (id) => {
    const hcps = resDetails.hcps.filter((item) => item.hcp.id !== id);
    setResDetails({ ...resDetails, hcps });
  };

  return (
    <div className=" mt-20 bg-white border-gray-500 shadow-md  flex flex-col justify-center items-center max-w-2xl mx-auto border-2 rounded-md p-6  ">
      {/* Modal for client search */}
      <Modal
        isOpened={isClientModalOpened}
        onClose={() => setIsClientModalOpened(false)}
      >
        <ClientSearch
          handleAddClient={handleAddClient}
          closeModal={setIsClientModalOpened}
        />
      </Modal>

      {/* Modal for hcp search */}
      <Modal
        isOpened={isHcpModalOpened}
        onClose={() => setIsHcpModalOpened(false)}
      >
        <HcpSearch
          handleAddHcp={handleAddHcp}
          closeModal={setIsHcpModalOpened}
        />
      </Modal>
      {/* /////////////////// */}
      <h1 className="text-left w-full m-4 font-semibold">Event Details</h1>

      <div className="flex justify-between items-center w-full">
        <div>Date/Time</div>
        <div>
          {/* <input
            type="DATETIME-LOCAL"
            value={resDetails?.datetime}
            onChange={(e) =>
              setResDetails({ ...resDetails, datetime: e.target.value })
            }
          /> */}
        </div>
      </div>
      <div className="flex justify-between items-center w-full my-3">
        <div>Duration</div>
        <div>
          <input defaultValue={resDetails?.duration} />
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
            setSelected={(e) =>
              setResDetails({ ...resDetails, location: { id: `LOCATION1` } })
            }
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
            setSelected={(e) =>
              setResDetails({ ...resDetails, medium: { id: "MEDIUM1" } })
            }
          />
        </div>
      </div>

      <ClientInfo
        data={resDetails?.clients}
        handleRemoveClient={handleRemoveClient}
        showClientSearchModal={showClientSearchModal}
      />
      <HcpInfo
        data={resDetails?.hcps}
        handleRemoveHcp={handleRemoveHcp}
        showHcpSearchModal={showHcpSearchModal}
      />
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
