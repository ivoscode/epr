import { ChevronRightIcon } from "@heroicons/react/solid";

export default function GpPracticeSearchResults({
  nothingFound,
  gpSearchRes,
  handleGpSelection,
}) {
  if (nothingFound) {
    return <div>nothing found</div>;
  }
  if (!gpSearchRes) {
    return null;
  }

  return (
    <div className="pb-20 w-full max-w-xl ">
      {/*----------comp---------------*/}
      <div className="m-3 mb-36 rounded-md shadow-md mx-auto  border-2 border-gray-700">
        {/*-----------------header-----*/}
        <div className="flex justify-between text-white bg-gray-800 px-4 py-2">
          <div className="w-2/12 text-center">ID</div>
          <div className=" w-4/12 text-center ">Name</div>

          <div className="w-2/12 text-center"></div>
        </div>
        {/*-------data-------------*/}
        <div>
          <ul>
            {gpSearchRes?.map((item, x) => {
              return (
                <li
                  key={x}
                  className="flex justify-between border-b-2 items-center px-2 py-0.5 hover:bg-gray-100"
                >
                  {/*id*/}
                  <div className="w-2/12 text-center ">{item.id}</div>

                  {/*name*/}
                  <div className="w-4/12 text-center ">{item.description}</div>

                  {/*button*/}
                  <div className="w-2/12   flex justify-center">
                    <button
                      className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8"
                      onClick={() => {
                        handleGpSelection(item);
                      }}
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
