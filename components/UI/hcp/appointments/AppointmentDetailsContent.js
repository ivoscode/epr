import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import format from "date-fns/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDefaultOption } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
import Modal from "../../../Modal";
import BtnMain from "../../../Shared/buttons/BtMain";
import Picklist from "../../../Shared/formElements/Picklist";
import ClientInfo from "./ClientInfo";
import HcpInfo from "./HcpInfo";
import ClientSearch from "./search/ClientSearch";
import HcpSearch from "./search/HcpSearch";

export default function AppointmentDetailsContent() {
  const router = useRouter();
  const userState = JSON.parse(sessionStorage.getItem("EprUser"));
  ////////////////State////////////////

  const [isClientModalOpened, setIsClientModalOpened] = useState(false);
  const [isHcpModalOpened, setIsHcpModalOpened] = useState(false);
  const [category, setCategory] = useState(null);

  const [medium, setMedium] = useState(null);
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);
  const [details, setDetails] = useState({
    clients: [],
    hcps: [],
    duration: 0,
    id: null,
    comment: "",
  });
  console.log("details", details);
  //---------------Getting pick-list items for Category
  useEffect(() => {
    getApiData("GET", `/api/appointments/configuration-categories`).then(
      (x) => {
        x.data.splice(0, 0, getDefaultOption()); //Adds one more option to pick-list array
        //addDefaultOption(x.data);
        setCategory(x.data);
      }
    );
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => {
        x.data.splice(0, 0, getDefaultOption());
        setLocation(x.data);
      }
    );
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => {
        x.data.splice(0, 0, getDefaultOption());
        setMedium(x.data);
      }
    );
  }, []);

  //---------------Getting pick-list items for Type

  useEffect(() => {
    getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
      (x) => {
        x.data.splice(0, 0, getDefaultOption());
        setType(x.data);
      }
    );
  }, []);

  //--------------Getting event details for a new entry
  useEffect(() => {
    if (router.query.datetime && userState) {
      setDetails({
        ...details,
        datetime: router.query.datetime,
        duration: 30,
        hcps: [
          {
            hcp: {
              id: userState.hcp.hcpId,
              description: userState.hcp.description,
            },
          },
        ],
      });
    }
  }, []);
  //-----------Getting existing event details
  useEffect(() => {
    router.query.id &&
      getApiData("GET", `/api/appointment/details?id=${router.query.id}`).then(
        (x) => setDetails(x?.data)
      );
  }, []);
  //--------------Saving details to API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("details in POST function", details);
    getApiData(`POST`, `/api/appointment/save`, details).then((x) => {
      if (x.status == 200) {
        router.back();
        console.log(x);
      }
    });
  };

  //-------------Adding and removing clients and hcps
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
  if (!details) {
    return <div>no details</div>;
  }
  return (
    <div className=" my-20    flex flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  ">
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              showTodayButton
              autoOk
              ampm={false}
              value={details?.datetime}
              onChange={(e) =>
                setDetails({
                  ...details,
                  datetime: format(e, "yyyy-MM-dd'T'HH:mm"),
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      {/*------------duration--------*/}
      <div className="flex justify-between items-center w-full my-3">
        <div>Duration</div>
        <div>
          <input
            className="bg-main-bg-color"
            value={details?.duration}
            placeholder="0"
            onChange={(e) => {
              console.log(e.target.value);
              setDetails({ ...details, duration: e.target.value });
            }}
          />
        </div>
      </div>
      <Picklist
        options={category}
        value={details?.category?.id}
        label="Category"
        setSelected={(e) => {
          setDetails({ ...details, category: { id: e } });
        }}
      />

      <Picklist
        options={type}
        value={details?.type?.id}
        label="Type"
        setSelected={(e) => setDetails({ ...details, type: { id: e } })}
      />
      <Picklist
        options={location}
        value={details?.location?.id}
        label="Location"
        setSelected={(e) => setDetails({ ...details, location: { id: e } })}
      />
      <Picklist
        options={medium}
        value={details?.medium?.id}
        label="Medium"
        setSelected={(e) => setDetails({ ...details, medium: { id: e } })}
      />

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
            value={details?.comment || ""}
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
          <BtnMain style="mt-8" onClick={handleSubmit}>
            Add
          </BtnMain>
        </div>
        <div>
          <BtnMain
            style="mt-8"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </BtnMain>
        </div>
      </div>
    </div>
  );
}
