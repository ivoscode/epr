import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";
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

  const [isClientModalOpened, setIsClientModalOpened] = useState(false);
  const [isHcpModalOpened, setIsHcpModalOpened] = useState(false);
  const [categories, setCategories] = useState(null);
  const [medium, setMedium] = useState(null);
  const [types, setTypes] = useState(null);
  const [location, setLocation] = useState(null);
  const [details, setDetails] = useState({
    clients: [{ client: { id: null, description: null } }],
  });

  console.log("response and save object", details);

  ////////////API calls/////////////////
  useEffect(() => {
    router.query.id &&
      getApiData("GET", `/api/appointment/details?id=${router.query.id}`).then(
        (x) => setDetails(x.data)
      );
  }, []);
  useEffect(() => {
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => setCategories(x.data)
    );
  }, []);
  useEffect(() => {
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => setLocation(x.data)
    );
  }, []);
  useEffect(() => {
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => setMedium(x.data)
    );
  }, []);

  /////////////////////////
  useEffect(() => {
    if (router.query.datetime && user) {
      setDetails({
        ...details,
        datetime: router.query.datetime,
        hcps: [
          {
            hcp: {
              id: user.hcpId,
              description: user.name,
            },
          },
        ],
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    getApiData(`POST`, `/api/appointment/save`, details);
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
    if (details.clients.find((item) => item.client.id == client.id)) {
      return;
    }

    const clients = details.clients.concat({
      client: {
        id: client.id,
        description:
          client.name.title + ` ` + client.name.first + ` ` + client.name.last,
      },
    });
    console.log(clients);
    setDetails({ ...details, clients });
  };

  const handleRemoveClient = (id) => {
    const clients = details.clients.filter((item) => item.client.id !== id);
    setDetails({ ...details, clients });
  };
  const handleAddHcp = (hcp) => {
    if (details.hcps.find((item) => item.hcp.id == hcp.id)) {
      return;
    }

    const hcps = details.hcps.concat({
      hcp: {
        id: hcp.id,
        description:
          hcp.name.title + ` ` + hcp.name.first + ` ` + hcp.name.last,
      },
    });
    console.log(hcps);
    setDetails({ ...details, hcps });
  };

  const handleRemoveHcp = (id) => {
    const hcps = details.hcps.filter((item) => item.hcp.id !== id);
    setDetails({ ...details, hcps });
  };

  // const handleCategoryChange = (e) => {
  //   getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
  //     (x) => setTypes(x.data)
  //   );
  // };

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
          <input
            type="DATETIME-LOCAL"
            value={details?.datetime || "0000-00-00T00:00"}
            onChange={(e) =>
              setDetails({ ...details, datetime: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full my-3">
        <div>Duration</div>
        <div>
          <input
            value={details?.duration || 30}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Category</div>
        <div>
          <DropList
            options={categories}
            selected={
              details?.category || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => {
              console.log(e);
              setDetails({ ...details, category: e });
            }}
            //onChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Type</div>
        <div>
          <DropList
            options={categories}
            selected={
              details?.Type || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setDetails({ ...details, type: e })}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Location</div>
        <div>
          <DropList
            options={location}
            selected={
              details?.location || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setDetails({ ...details, location: e })}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Medium</div>
        <div>
          <DropList
            options={medium}
            selected={
              details?.medium || {
                id: "",
                description: `Please Select`,
              }
            }
            setSelected={(e) => setDetails({ ...details, medium: e })}
          />
        </div>
      </div>

      <ClientInfo
        data={details?.clients}
        handleRemoveClient={handleRemoveClient}
        showClientSearchModal={showClientSearchModal}
      />
      <HcpInfo
        data={details?.hcps}
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
            value={details?.comment}
            onChange={(e) =>
              setDetails({ ...details, comment: e.target.value })
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
