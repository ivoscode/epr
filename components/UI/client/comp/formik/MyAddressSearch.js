import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { getDefaultOption } from "../../../../helpers/helperFunctions";
import getAddressApi from "../../../../hooks/getAddressApi";
import BtnMain from "../../../../Shared/buttons/BtMain";
import Picklist from "../../../../Shared/formElements/Picklist";
import MyTextInput from "./MyTextInput";
export default function MyAddressSearch(props) {
  const postcodeToSearch = useRef(null);
  const [initialAddress, setInitialAddress] = useState({
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
    postcode: "",
  });

  const [picklistOptions, setPicklistOptions] = useState();
  const [showSearchResultsList, setShowSearchResultsList] = useState(false);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    setInitialAddress(props.initialAddress);
  }, [props.initialAddress]);

  const Container = (props) => {
    return (
      <div className="w-full border-2 border-gray-100 rounded-xl p-8 mb-6 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };
  //--------------------Post code validate and format----------------------

  const formatPostcode = (p) => {
    if (isValidPostcode(p)) {
      var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i;
      return p.replace(postcodeRegEx, "$1 $2").toUpperCase();
    } else {
      return p;
    }
  };

  const handleSubmit = (values, actions) => {
    props.setValues({ ...props.values, address: { ...values } });
    actions.setSubmitting(false);
    props.onClose();
  };
  {
    /*--------------------items for search box-------------------------------*/
  }
  //--------------------Post code validate and format----------------------
  const isValidPostcode = (p) => {
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    const result = postcodeRegEx.test(p);

    return result;
  };

  //--------------------Call to  post code API----------------------
  const handleGetAddress = () => {
    isValidPostcode(postcodeToSearch.current.value) &&
      getAddressApi(postcodeToSearch.current.value).then((x) => {
        console.log("response from getAddressApi", x);

        setAddresses(x.data);
        const picklistOpt = x.data.addresses?.map((address) => {
          return {
            id: address.line_1,
            description: address.formatted_address.toString(),
          };
        });
        const picklistOptions = [getDefaultOption()].concat(picklistOpt);

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

  {
    /*------------Validation------------*/
  }
  const validationSchema = Yup.object().shape({
    line1: Yup.string().required("Required"),
    postcode: Yup.string()
      .trim()
      .matches(
        /(^(([A-Z][0-9]{1,2})|(([A-Z][A-HJ-Y][0-9]{1,2})|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z])))) [0-9][A-Z]{2}$)/i,
        "Is not in correct format"
      )
      .required("Required"),
  });
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialAddress}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { isSubmitting, values } = props;
          {
            /* {
            console.log(isSubmitting);
          } */
          }
          return (
            <Form>
              <div
                className=" mb-10  mt-52 sm:mt-16  overflow-hidden flex 
       flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  "
              >
                {/*----------search box--------------*/}
                <Container>
                  <div className="flex items-center  w-full justify-between ">
                    <div>
                      <input
                        type="text"
                        ref={postcodeToSearch}
                        className="input-box uppercase"
                      />
                    </div>
                    <BtnMain onClick={handleGetAddress}>Search</BtnMain>
                  </div>
                  {/*-------------------Address Pick List------------------------------*/}
                  <div
                    className={`${showSearchResultsList ? "block" : "hidden"}`}
                  >
                    <Picklist
                      options={picklistOptions}
                      setSelected={(e) => pickAddress(e)}
                    />
                  </div>

                  {/* <MyAddressSearchInput
                    setInitialAddress={setInitialAddress}
                  
                  /> */}
                </Container>
                {/*----------Address fields-----------*/}

                <Container>
                  <MyTextInput
                    label="Address Line 1"
                    name="line1"
                    type="text"
                    registerChange={props.registerChange}
                  />
                  <MyTextInput
                    label="Address Line 2"
                    name="line2"
                    type="text"
                    registerChange={props.registerChange}
                  />
                  <MyTextInput
                    label="Locality"
                    name="line3"
                    type="text"
                    registerChange={props.registerChange}
                  />
                  <MyTextInput
                    label="Town or City"
                    name="line4"
                    type="text"
                    registerChange={props.registerChange}
                  />
                  <MyTextInput
                    label="County"
                    name="line5"
                    type="text"
                    registerChange={props.registerChange}
                  />
                  <MyTextInput
                    label="Postcode"
                    name="postcode"
                    type="text"
                    style="uppercase"
                    registerChange={props.registerChange}
                  />
                </Container>
                {/*----------button-------------*/}

                <BtnMain style="mt-8" type="submit">
                  {/* disabled={isSubmitting} */}
                  Save
                </BtnMain>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
