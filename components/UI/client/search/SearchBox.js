import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import BtnMain from "../../../Shared/Buttons/BtnMain";
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
            <Disclosure.Button className="flex justify-between items-center  px-2 py-2  text-white bg-chevron-color  hover:bg-chevron-hover-color ">
              <ChevronUpIcon className="w-8 h-8 " />
            </Disclosure.Button>
          </div>
          {/*Button ends*/}
          {disclosureOpen && (
            <Disclosure.Panel
              static
              className="flex justify-between  w-full  px-10 py-2 text-sm font-medium text-left   "
            >
              <div
                className=" overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto shadow-md rounded-md p-6  "
              >
                <div>
                  <p className="text-2xl  pb-2">{title}</p>
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
                          <label className="  font-bold" htmlFor="Email">
                            {item.label}
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={searchParams[item.name] || ""}
                            name={item.name}
                            onChange={handleChange}
                            className=" input-box "
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="  w-full flex justify-evenly ">
                    <BtnMain style="mt-8" type="submit">
                      Search
                    </BtnMain>
                    <BtnMain
                      style="mt-8"
                      hidden={!displayAddButton}
                      onClick={handleNavigateToDemographics}
                    >
                      Add
                    </BtnMain>
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
