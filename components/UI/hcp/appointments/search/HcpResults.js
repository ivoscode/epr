import { useRouter } from "next/router";
import Select from "../../../icons/Select";
export default function ClientResults({
  hcpSearchResults,
  handleAddHcp,
  closeModal,
}) {
  const router = useRouter();

  return (
    <div>
      <ul className=" font-bold h-10 card my-6 px-4 bg-white grid grid-cols-5">
        <li>Name</li>

        <li>Gender</li>
        <li>Date of Birth</li>
        <li>Address</li>
      </ul>
      <div className="mt-10">
        {hcpSearchResults?.map((result) => {
          return (
            <ul
              className="card my-6 px-4 bg-white grid grid-cols-5"
              key={result.id}
            >
              <li className="">{`${result.name.title} ${result.name.first} ${result.name.last}`}</li>

              <li>{result.gender.description}</li>
              <li>{result.dob}</li>
              <li>{result.address.line1}</li>
              <li>
                <button
                  onClick={() => {
                    closeModal();
                    handleAddHcp(result);
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
