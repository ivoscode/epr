import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
export default function SearchBox({
  title,
  labels,
  handleSubmit,
  searchParams,
  setSearchParams,
  disclosureOpen,
  setDisclosureOpen,
  handleNavigateToDemographics,
  displayAddButton,
}) {
  const handleChange = (evt) => {
    const value = evt.target.value;
    setSearchParams({
      ...searchParams,
      [evt.target.name]: value,
    });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div
            onClick={() => {
              setDisclosureOpen(!disclosureOpen);
            }}
            className={`${
              disclosureOpen
                ? "hidden"
                : "flex justify-end w-full bg-gray-200 cursor-pointer rounded-md shadow-sm"
            }`}
          >
            <div className=" text-blue-700 w-full flex justify-center items-center">
              SEARCH AGAIN
            </div>
            <Disclosure.Button className="flex justify-between items-center  px-2 py-2  text-white bg-gray-700  hover:bg-gray-800 ">
              <ChevronUpIcon className="w-8 h-8 text-white" />
            </Disclosure.Button>
          </div>
          {/*Button ends*/}
          {disclosureOpen && (
            <Disclosure.Panel
              static
              className="flex justify-between text-gray-500 w-full  px-10 py-2 text-sm font-medium text-left text-white  "
            >
              <div
                className="  bg-white border-gray-500 shadow-md overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto border-2 rounded-md p-6  "
              >
                <div>
                  <p className="text-2xl text-gray-500 pb-2">{title}</p>
                </div>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                  className="flex flex-col items-end  "
                >
                  {labels.map((item) => {
                    return (
                      <div key={item.name} className="flex items-center mt-4 ">
                        <div className=" mr-5 ">
                          <label
                            className=" text-gray-500 font-bold"
                            htmlFor="Email"
                          >
                            {item.label}
                          </label>
                        </div>
                        <div className="">
                          <input
                            type="text"
                            value={searchParams[item.name] || ""}
                            name={item.name}
                            onChange={handleChange}
                            className=" w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 "
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="  w-full flex justify-evenly ">
                    <button
                      type="submit"
                      className="  inline-block  mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
                    >
                      Search
                    </button>
                    <button
                      onClick={handleNavigateToDemographics}
                      type="button"
                      className={`${
                        displayAddButton
                          ? "inline-block  mt-8 bg-green-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
                          : "hidden"
                      }`}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
