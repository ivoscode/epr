import { useField } from "formik";
import React, { useRef, useState } from "react";
import getAddressApi from "../../../../hooks/getAddressApi";
import Modal from "../../../../Modal";
import BtnMain from "../../../../Shared/Buttons/BtnMain";
import AddressDropList from "./AddressDropList";
export default function MyAddressSearch({ ...props }) {
  const [field, meta, helpers] = useField(props);
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const line4 = useRef(null);
  const line5 = useRef(null);
  const postcode = useRef(null);
  const [isAddressSearchModalOpened, setIsAddressSearchModalOpened] =
    useState(false);
  const [addresses, setAddresses] = useState([]);
  const [postcodeToSearch, setPostcodeToSearch] = useState("");
  const [picklistOptions, setPicklistOptions] = useState();
  const [showSearchResultsList, setShowSearchResultsList] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const handleSave = () => {
    let address = meta.value;

    address.line1 = line1.current.value;
    address.line2 = line2.current.value;
    address.line3 = line3.current.value;
    address.line4 = line4.current.value;
    address.line5 = line5.current.value;
    address.postcode = postcode.current.value;
    helpers.setValue(address);
    setIsAddressSearchModalOpened(false);
  };

  ///--------Sets the right address based on the picklist-----------------
  const pickAddress = (e) => {
    const pickedAddress = addresses.addresses.find((item) => {
      return item.line_1 == e.id;
    });
    setSelectedAddress(pickedAddress);
    //---populates the fields but is not saving
    line1.current.value = pickedAddress.line_1;
    line2.current.value = pickedAddress.line_2;
    line3.current.value = pickedAddress.locality;
    line4.current.value = pickedAddress.town_or_city;
    line5.current.value = pickedAddress.county;
    postcode.current.value = addresses.postcode;
  };
  //--------------------Call to  post code API----------------------
  const handleGetAddress = () => {
    getAddressApi(postcodeToSearch).then((x) => {
      console.log("response from getAddressApi", x);
      setAddresses(x.data);
      const picklistOptions = x.data.addresses?.map((address) => {
        return {
          id: address.line_1,
          description: address.formatted_address.toString(),
        };
      });
      setPicklistOptions(picklistOptions);
      setShowSearchResultsList(true);
    });
  };
  const picklistOption1 = () => {
    if (!selectedAddress) {
      return null;
    }

    return {
      id: "",
      description: selectedAddress?.formatted_address.toString(),
    };
  };
  return (
    <div>
      <Modal
        isOpened={isAddressSearchModalOpened}
        onClose={() => setIsAddressSearchModalOpened(false)}
      >
        <div className="bg-red-700">
          {/* --------get address button*/}
          <div className="flex items-center  w-full justify-between mt-16">
            <div>
              <input
                type="text"
                value={postcodeToSearch}
                onChange={(e) => {
                  setPostcodeToSearch(e.target.value);
                }}
                className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 "
              />
            </div>
            <BtnMain onClick={handleGetAddress}> Search</BtnMain>
          </div>
          {/*-------------------Drop List------------------------------*/}
          <div className={`${showSearchResultsList ? "block" : "hidden"}`}>
            <AddressDropList
              options={picklistOptions}
              selected={
                picklistOption1() || {
                  id: "",
                  description: `Please select your address`,
                }
              }
              setSelected={(e) => {
                pickAddress(e);
              }}
            />
          </div>
          {/* ------------search results------------ */}
          <ul className=" mx-auto mt-20 max-w-3xl">
            {[
              { line: line1, def: meta.value.line1, label: "Address Line 1" },
              { line: line2, def: meta.value.line2, label: "Address Line 2" },
              { line: line3, def: meta.value.line3, label: "Locality" },
              { line: line4, def: meta.value.line4, label: "Town or City" },
              { line: line5, def: meta.value.line5, label: "County" },
              { line: postcode, def: meta.value.postcode, label: "Postcode" },
            ].map((item, x) => {
              return (
                <li key={x}>
                  <div className=" text-gray-500 font-bold mr-10">
                    <label htmlFor={item.line}>{item.label}</label>
                  </div>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 mt-2"
                    ref={item.line}
                    defaultValue={item.def}
                  />
                </li>
              );
            })}
          </ul>
          <BtnMain onClick={handleSave}>Save</BtnMain>
        </div>
      </Modal>

      <div className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4">
        <ul>
          <li>{meta.value.line1}</li>
          <li>{meta.value.line2}</li>
          <li>{meta.value.line3}</li>
          <li>{meta.value.line4}</li>
          <li>{meta.value.line5}</li>
          <li>{meta.value.postcode}</li>
        </ul>
      </div>
      <div className="flex items-center mt-8 w-full justify-between">
        <BtnMain
          onClick={() => {
            setIsAddressSearchModalOpened(true);
          }}
        >
          Search
        </BtnMain>
      </div>
    </div>
  );
}
