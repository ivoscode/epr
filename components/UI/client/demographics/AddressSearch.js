import { useState } from "react";
import getAddressApi from "../../../hooks/getAddressApi";
import AddressDropList from "./AddressDropList";

export default function AddressSearch({ client, setClient }) {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState();
  const [picklistOptions, setPicklistOptions] = useState();
  // console.log(address);
  console.log(client);

  ///--------Sets the right address based on the picklist
  const pickAddress = (e) => {
    const pickedAddress = addresses.find((item) => {
      return item.line_1 == e.id;
    });
    setClient({
      ...client,
      address: {
        line1: pickedAddress.line_1,
        line2: pickedAddress.line_2,
        line3: pickedAddress.line_3,
        line4: pickedAddress.locality,
        line5: pickedAddress.district,
        postcode: postcode.toUpperCase(),
      },
    });
    setAddress(pickedAddress);
  };
  //--------------------Call to  post code API
  const handleGetAddress = () => {
    getAddressApi(postcode).then((x) => {
      console.log("response from getAddressApi", x);
      setAddresses(x.data.addresses);
      const picklistOptions = x.data.addresses?.map((address) => {
        return {
          id: address.line_1,
          description: address.formatted_address.toString(),
        };
      });
      setPicklistOptions(picklistOptions);
    });
  };
  return (
    <div className="pt-12">
      {/* --------get address button*/}
      <div className="flex items-center mt-8 w-full justify-between">
        <div>
          <input
            type="text"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
            }}
            className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 "
          />
        </div>
        <button
          className=" inline-block   bg-pink-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
          type="button"
          placeholder="Please enter postcode"
          onClick={handleGetAddress}
        >
          Search
        </button>
      </div>
      {/*-------------------Drop List------------------------------*/}

      <AddressDropList
        options={picklistOptions}
        selected={{
          id: "",
          description: `Please select your address`,
        }}
        setSelected={(e) => {
          console.log(e);
          pickAddress(e);
        }}
      />

      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.line1}
        onChange={(e) => {
          setClient({ ...client, address: { line1: e.target.value } });
        }}
      />

      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.line2}
        onChange={(e) => {
          setClient({ ...client, address: { line2: e.target.value } });
        }}
      />
      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.line3}
        onChange={(e) => {
          setClient({ ...client, address: { line3: e.target.value } });
        }}
      />
      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.line4}
        onChange={(e) => {
          setClient({ ...client, address: { line4: e.target.value } });
        }}
      />
      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.line5}
        onChange={(e) => {
          setClient({ ...client, address: { line5: e.target.value } });
        }}
      />
      <input
        className="mt-20 w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
        type="text"
        value={client.address.postcode}
        onChange={(e) => {
          setClient({ ...client, address: { postcode: e.target.value } });
        }}
      />
    </div>
  );
}
