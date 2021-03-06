import { ChevronRightIcon } from "@heroicons/react/solid";
import {
  formatDate,
  formatName,
  formatNhs,
} from "../../../helpers/helperFunctions";
export default function ClientSearchResultsTable({
  clientSearchResults,
  handleSelection,
}) {
  return (
    <div className="pb-20 ">
      {/*----------comp---------------*/}
      <div className="m-3 mb-36 rounded-md shadow-md mx-auto  border-2 border-gray-700">
        {/*-----------------header-----*/}
        <div className="flex justify-between text-white bg-gray-800 px-4 py-2">
          <div className="w-3/12 text-center">Name</div>
          <div className="w-2/12 text-center">NHS number</div>
          <div className="w-1/12 text-center">Gender</div>
          <div className="w-2/12 text-center">DOB</div>
          <div className="w-3/12 text-center">Address</div>
          <div className="w-1/12 text-center"></div>
        </div>
        {/*-------data-------------*/}
        <div>
          <ul>
            {clientSearchResults?.map((result, x) => {
              return (
                <li
                  key={x}
                  className="flex justify-between border-b-2 items-center px-2 py-0.5 hover:bg-gray-100"
                >
                  {/*name*/}
                  <div className="w-3/12 text-center ">
                    {formatName(result?.name)}
                  </div>

                  {/*nhs number*/}
                  <div className="w-2/12 text-center ">
                    {formatNhs(result?.nhs)}
                  </div>
                  {/*gender*/}
                  <div className="w-1/12 text-center ">
                    {result?.gender?.description}
                  </div>
                  {/*DOB*/}
                  <div className="w-2/12 text-center ">
                    {formatDate(result?.dob)}
                  </div>
                  {/*Address*/}
                  <div className="w-3/12 text-center ">
                    {result?.address?.line1}
                  </div>
                  {/*button*/}
                  <div className="w-1/12   flex justify-center">
                    <button
                      className=" flex items-center  bg-chevron-color  hover:bg-chevron-hover-color text-white rounded-md w-8 h-8"
                      onClick={() => {
                        handleSelection(result);
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
