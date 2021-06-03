import { useRouter } from "next/router";
import { useState } from "react";
import { axiosPost } from "../../../helpers/helperFunctions";
import useAxios from "../../../hooks/useAxios";
import DropList from "./DropList";
export default function AppointmentDetailsContent() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState({
    value: null,
    name: `Please Select`,
  });
  const submitData = {
    id: 1,
    title: "doctor",
  };
  const { response: categories } = useAxios(
    `/api/temp/configuration/appointmentcategories`
  );
  // const { response: details } = useAxios(`/api/appointments/details?id=1`);
  // console.log(details);
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = axiosPost(submitData);
    console.log(result);
  };
  return (
    <div className=" mt-20 bg-white border-gray-500 shadow-md  flex flex-col justify-center items-center max-w-2xl mx-auto border-2 rounded-md p-6  ">
      <h1 className="text-left w-full m-4 font-semibold">Event Details</h1>
      <div className="flex justify-between items-center w-full">
        <div>Category</div>
        <div>
          <DropList
            //ask question
            options={categories?.data}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </div>
      </div>
      <div className="flex w-full justify-around">
        <div>
          <button
            onClick={handleSubmit}
            className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          >
            Save
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              router.back();
            }}
            className=" mt-8 bg-pink-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
