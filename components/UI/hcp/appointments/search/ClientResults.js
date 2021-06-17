import Select from "../../../icons/Select";
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

  return (
    <div>
      <ul className=" font-bold h-10 card my-6 px-4 bg-white grid grid-cols-6">
        <li>Name</li>
        <li>NHS Number</li>
        <li>Gender</li>
        <li>Date of Birth</li>
        <li>Address</li>
      </ul>
      <div className="mt-10">
        {clientSearchResults?.map((result) => {
          return (
            <ul
              className="card my-6 px-4 bg-white grid grid-cols-6"
              key={result.id}
            >
              <li className="">{`${result.name.title} ${result.name.first} ${result.name.last}`}</li>
              <li className="">{result.nhs}</li>
              <li>{result.gender.description}</li>
              <li>{result.dob}</li>
              <li>{result.address.line1}</li>
              <li>
                <button
                  onClick={() => {
                    closeModal();
                    handleAddClient(result);
                  }}
                  className=""
                >
                  <Select />
                </button>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
