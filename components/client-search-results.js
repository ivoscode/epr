export default function ClientSearchResults({ clientSearchResults }) {
  if (clientSearchResults.length === 0) {
    return null;
  }
  return (
    <div>
      <ul className=" font-bold h-10 card my-6 bg-white flex justify-around items-center">
        <li>Name</li>
        <li>NHS Number</li>
        <li>Gender</li>
        <li>Date of Birth</li>
        <li>Address</li>
      </ul>
      <ul className="mt-10">
        {clientSearchResults.map((result) => {
          return (
            <div
              className="card my-6 bg-white flex justify-around"
              key={result.id}
            >
              <li>{result.name.first}</li>
              <li>{result.nhs}</li>
              {/* <li>{result.gender.description}</li>*/}
              <li>{result.dob}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
