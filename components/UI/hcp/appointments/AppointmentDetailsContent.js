import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import DropList from "./DropList";

export default function AppointmentDetailsContent() {
  const router = useRouter();

  ////////////////State////////////////
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    description: `Please Select`,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    description: `Please Select`,
  });
  const [selectedMedium, setSelectedMedium] = useState({
    id: "",
    description: `Please Select`,
  });
  const [selectedType, setSelectedType] = useState({
    id: "",
    description: `Please Select`,
  });
  const [comment, setComment] = useState("");
  console.log(comment);
  const [dataToPost, setDataToPost] = useState({ id: 1, title: "doctor" });

  ////////////Axios calls/////////////////

  const { response: categories } = useAxios(
    `/api/temp/configuration/appointmentcategories`
  );

  const { response: details } = useAxios(
    `/api/appointment/details?id=${router.query.id}`
  );
  const { response, error, postData } = useAxiosPost(
    `/api/appointment/details?id=${router.query.id}`,
    dataToPost
  );
  useEffect(() => {
    setSelectedCategory(details?.data.category);
    setSelectedLocation(details?.data.location);
    setSelectedMedium(details?.data.medium);
    setSelectedType(details?.data.type);
    setComment(details?.data.comment);
    console.log(details);
  }, [details]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };
  if (!details) {
    return null;
  }
  return (
    <div className=" mt-20 bg-white border-gray-500 shadow-md  flex flex-col justify-center items-center max-w-2xl mx-auto border-2 rounded-md p-6  ">
      <h1 className="text-left w-full m-4 font-semibold">Event Details</h1>
      <div className="flex justify-between items-center w-full">
        <div>Category</div>
        <div>
          <DropList
            options={categories?.data}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Location</div>
        <div>
          <DropList
            options={categories?.data}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Medium</div>
        <div>
          <DropList
            options={categories?.data}
            selected={selectedMedium}
            setSelected={setSelectedMedium}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>Type</div>
        <div>
          <DropList
            options={categories?.data}
            selected={selectedType}
            setSelected={setSelectedType}
          />
        </div>
      </div>
      <div className=" mt-10 flex justify-between items-center w-full">
        <div>
          <label htmlFor="comments">Comments</label>
        </div>
        <div>
          <textarea
            className="shadow-sm  border-2 rounded-md"
            id="comments"
            name="comments"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            rows="4"
            cols="40"
          ></textarea>
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
