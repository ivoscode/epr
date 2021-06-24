import ClientSearchResultsTable from "../../../client/search/ClientSearchResultsTable";
export default function ClientResults({
  clientSearchResults,
  handleAddClient,
  closeModal,
  nothingFound,
}) {
  if (nothingFound) {
    return <div>nothing found</div>;
  }
  if (!clientSearchResults) {
    return null;
  }

  const handleSelection = (result) => {
    closeModal();
    handleAddClient(result);
  };

  return (
    <ClientSearchResultsTable
      handleSelection={handleSelection}
      clientSearchResults={clientSearchResults}
    />
  );
}
