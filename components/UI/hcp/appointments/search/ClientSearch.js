import { useState } from "react";
import SearchBox from "../../../client/search/SearchBox";
import getApiData from "./../../../../hooks/getApiData";
import ClientResults from "./ClientResults";
export default function ClientSearch({ handleAddClient, closeModal }) {
  const [clientSearchResults, setClientSearchResults] = useState(null);
  const [disclosureOpen, setDisclosureOpen] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const boxTitle = "Client Search";
  const labels = [
    { name: "nhsnumber", label: "NHS Number" },
    { name: "clientid", label: "Client ID" },
    { name: "lastname", label: "Last Name" },
    { name: "firstname", label: "First Name" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      searchParams.firstname ||
      searchParams.lastname ||
      searchParams.nhsnumber ||
      searchParams.clientid
    ) {
      getApiData("GET", `/api/clients/search/`, searchParams).then((x) => {
        console.log(x.data);
        if (x.data[0] == null) {
          setNothingFound(true);
          return;
        }
        setNothingFound(false);
        setDisclosureOpen(false);
        setClientSearchResults(x.data);
      });
    }
  };

  return (
    <div className=" mt-20 ">
      <SearchBox
        labels={labels}
        title={boxTitle}
        setSearchParams={setSearchParams}
        handleSubmit={handleSubmit}
        searchParams={searchParams}
        disclosureOpen={disclosureOpen}
        setDisclosureOpen={setDisclosureOpen}
      />
      <ClientResults
        clientSearchResults={clientSearchResults}
        nothingFound={nothingFound}
        handleAddClient={handleAddClient}
        closeModal={closeModal}
      />
    </div>
  );
}
