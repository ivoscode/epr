import { useState } from "react";
import SearchBox from "../../../client/search/SearchBox";
import getApiData from "./../../../../hooks/getApiData";
import HcpResults from "./HcpResults";
export default function HcpSearch({ handleAddHcp, closeModal }) {
  const [hcpSearchResults, setHcpSearchResults] = useState([]);
  const [disclosureOpen, setDisclosureOpen] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const boxTitle = "HCP Search";
  const labels = [
    { name: "hcpid", label: "HCP ID" },
    { name: "lastname", label: "Last Name" },
    { name: "firstname", label: "First Name" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParams.firstname || searchParams.lastname || searchParams.hcpid) {
      getApiData("GET", `/api/clients/search/`, searchParams).then((x) => {
        console.log(x.data);
        if (x.data[0] == null) {
          setNothingFound(true);
          return;
        }
        setNothingFound(false);
        setDisclosureOpen(false);
        setHcpSearchResults(x.data);
      });
    }
  };

  return (
    <div className="mt-20">
      <SearchBox
        labels={labels}
        title={boxTitle}
        setSearchParams={setSearchParams}
        handleSubmit={handleSubmit}
        searchParams={searchParams}
        disclosureOpen={disclosureOpen}
        setDisclosureOpen={setDisclosureOpen}
      />
      <HcpResults
        hcpSearchResults={hcpSearchResults}
        handleAddHcp={handleAddHcp}
        closeModal={closeModal}
        nothingFound={nothingFound}
      />
    </div>
  );
}
