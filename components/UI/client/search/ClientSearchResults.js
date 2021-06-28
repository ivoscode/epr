import { useRouter } from "next/router";
import ClientSearchResultsTable from "./ClientSearchResultsTable";
export default function ClientSearchResults({
  clientSearchResults,
  nothingFound,
}) {
  const router = useRouter();
  if (nothingFound) {
    return <div>nothing found</div>;
  }
  if (!clientSearchResults) {
    return null;
  }
  const handleSelection = (result) => {
    const back = sessionStorage.getItem(`search-back`);
    //might need refactoring
    if (back.indexOf(`?`) > 0) {
      router.push(back + `&clientid=${result.id}`);
    } else {
      router.push(back + `?clientid=${result.id}`);
    }
  };
  return (
    <ClientSearchResultsTable
      handleSelection={handleSelection}
      clientSearchResults={clientSearchResults}
    />
  );
}
