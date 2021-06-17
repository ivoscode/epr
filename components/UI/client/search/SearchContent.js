import { useRouter } from "next/router";
import { useState } from "react";
import getApiData from "../../../hooks/getApiData";
import ClientSearchResults from "./ClientSearchResults";
import SearchBox from "./SearchBox";

export default function ClientSearchForm() {
  const router = useRouter();
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
  const handleNavigateToDemographics = () => {
    router.push("/client/demographics?clientid=NEW");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      searchParams.firstname ||
      searchParams.lastname ||
      searchParams.nhsnumber ||
      searchParams.clientid
    ) {
      getApiData("GET", `/api/clients/search/`, searchParams).then((x) => {
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
    <div className="bg-gray-100 p-10">
      <SearchBox
        labels={labels}
        title={boxTitle}
        setSearchParams={setSearchParams}
        handleSubmit={handleSubmit}
        searchParams={searchParams}
        disclosureOpen={disclosureOpen}
        setDisclosureOpen={setDisclosureOpen}
        displayAddButton
        handleNavigateToDemographics={handleNavigateToDemographics}
      />
      <ClientSearchResults
        clientSearchResults={clientSearchResults}
        nothingFound={nothingFound}
      />
    </div>
  );
}
