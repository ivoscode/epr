import { useState } from "react";
import { getDefaultOption } from "../../../../helpers/helperFunctions";
import getAddressApi from "../../../../hooks/getAddressApi";
import BtnMain from "../../../../Shared/buttons/BtMain";
import Picklist from "../../../../Shared/formElements/Picklist";
export default function MyAddressSearchInput({ setInitialAddress }) {
  const [postcodeToSearch, setPostcodeToSearch] = useState("");
  const [picklistOptions, setPicklistOptions] = useState();
  const [showSearchResultsList, setShowSearchResultsList] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addresses, setAddresses] = useState([]);
  //--------------------Post code validate and format----------------------
  const isValidPostcode = (p) => {
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    const result = postcodeRegEx.test(p);

    return result;
  };
  // const formatPostcode = (p) => {
  //   if (isValidPostcode(p)) {
  //     var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
  //     return p.replace(postcodeRegEx, "$1 $2").toUpperCase();
  //   } else {
  //     return p;
  //   }
  // };
  //--------------------Call to  post code API----------------------
  const handleGetAddress = () => {
    isValidPostcode(postcodeToSearch) &&
      getAddressApi(postcodeToSearch).then((x) => {
        console.log("response from getAddressApi", x);

        setAddresses(x.data);
        const picklistOpt = x.data.addresses?.map((address) => {
          return {
            id: address.line_1,
            description: address.formatted_address.toString(),
          };
        });
        const picklistOptions = [getDefaultOption()].concat(picklistOpt);
        console.log(picklistOptions);
        setPicklistOptions(picklistOptions);

        if (x.data.addresses.length == 0) {
          setPicklistOptions([
            {
              id: 1,
              description: "nothing found",
            },
          ]);
        }
        setShowSearchResultsList(true);
      });
  };
  ///--------Sets the right address based on the picklist-----------------
  const pickAddress = (e) => {
    console.log("picked address", e);
    const pickedAddress = addresses.addresses.find((item) => {
      return item.line_1 == e;
    });
    setInitialAddress({
      line1: pickedAddress.line_1,
      line2: pickedAddress.line_2,
      line3: pickedAddress.locality,
      line4: pickedAddress.town_or_city,
      line5: pickedAddress.county,
      postcode: addresses.postcode,
    });
  };

  return (
    <div>
      <div className="flex items-center  w-full justify-between ">
        <div>
          <input
            type="text"
            value={postcodeToSearch}
            onChange={(e) => {
              setPostcodeToSearch(e.target.value);
            }}
            className="input-box uppercase"
          />
        </div>
        <BtnMain onClick={handleGetAddress}>Search</BtnMain>
      </div>
      {/*-------------------Address Pick List------------------------------*/}
      <div className={`${showSearchResultsList ? "block" : "hidden"}`}>
        <Picklist
          options={picklistOptions}
          setSelected={(e) => pickAddress(e)}
        />
      </div>
    </div>
  );
}
