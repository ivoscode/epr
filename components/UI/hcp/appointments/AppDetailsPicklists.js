import { useEffect, useState } from "react";
import { getDefaultOption } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
import Picklist from "../../../Shared/formElements/Picklist";

export default function AppDetailsPicklists({ details, setDetails }) {
  const [categories, setCategories] = useState(null);
  const [mediums, setMediums] = useState(null);
  const [types, setTypes] = useState(null);
  const [locations, setLocations] = useState(null);
  //---------------Getting pick-list items for Category
  useEffect(() => {
    getApiData("GET", `/api/appointments/configuration-categories`).then(
      (x) => {
        x.data.splice(0, 0, getDefaultOption()); //Adds one more option to pick-list array
        //addDefaultOption(x.data);
        setCategories(x.data);
      }
    );
    // getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
    //   (x) => {
    //     x.data.splice(0, 0, getDefaultOption());
    //     setLocations(x.data);
    //   }
    // );
    // getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
    //   (x) => {
    //     x.data.splice(0, 0, getDefaultOption());
    //     setMedium(x.data);
    //   }
    // );
  }, []);

  //---------------Getting pick-list items for category

  //   useEffect(() => {
  //     getApiData("GET", `/api/temp/configuration/appointmentcategories`).then(
  //       (x) => {
  //         x.data.splice(0, 0, getDefaultOption());
  //         setType(x.data);
  //       }
  //     );
  //   }, []);

  const handleCategoryChange = (e) => {
    getApiData(
      "GET",
      `/api/appointments/configuration-types?category=${e}`
    ).then((x) => setTypes(x.data));
    getApiData(
      "GET",
      `/api/appointments/configuration-locations?category=${e}`
    ).then((x) => setLocations(x.data));
  };
  return (
    <div className="w-full">
      <Picklist
        options={categories}
        value={details?.category?.id}
        label="Category"
        setSelected={(e) => {
          setDetails({ ...details, category: { id: e } });
          handleCategoryChange(e);
        }}
      />

      <Picklist
        options={types}
        value={details?.type?.id}
        label="Type"
        setSelected={(e) => setDetails({ ...details, type: { id: e } })}
      />
      <Picklist
        options={locations}
        value={details?.location?.id}
        label="Location"
        setSelected={(e) => setDetails({ ...details, location: { id: e } })}
      />
      <Picklist
        options={mediums}
        value={details?.medium?.id}
        label="Medium"
        setSelected={(e) => setDetails({ ...details, medium: { id: e } })}
      />
    </div>
  );
}
