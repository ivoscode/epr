import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";
import Modal from "../../../Modal";
import MyDatePicker from "../comp/formik/MyDatePicker";
import MySelect from "../comp/formik/MySelect";
import MyTextInput from "../comp/formik/MyTextInput";
import AddressSearch from "./AddressSearch";
export default function DemographicsContent() {
  const router = useRouter();
  const [isAddressSearchModalOpened, setIsAddressSearchModalOpened] =
    useState(false);

  const [client, setClient] = useState({
    nhs: "",
    name: {
      title: "",
      first: "",
      last: "",
    },
    address: {
      line1: "",
      line2: "",
      line3: "",
      line4: "",
      line5: "",
      postcode: "",
    },
    dob: "",
    gender: {
      code: "",
      description: "", ////mandatory field 2 is for female
    },
    telecom: null,
  });
  const titleDropdownOptions = [
    { description: "Select ", code: "" },
    { description: "Mr", code: "Mr" },
    { description: "Mrs", code: "Mrs" },
    { description: "Other", code: "Other" },
  ];
  const genderDropdownOptions = [
    { description: "Select ", code: "" },
    { description: "Male", code: "1" },
    { description: "Female", code: "2" },
  ];

  const Container = (props) => {
    return (
      <div className="w-full border-2 border-gray-900 rounded-xl p-3 mb-3 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };

  //----------- Getting data for existing client
  useEffect(() => {
    if (isNaN(parseInt(router.query.clientid))) {
      return;
    }
    getApiData(
      "GET",
      `/api/client/get/?clientId=${router.query.clientid}`
    ).then((x) => {
      setClient(x.data);
    });
  }, []);

  //--------------Posting form back----
  const handleSubmit = (values, actions) => {
    getApiData(`POST`, `/api/client/save`, values);
    actions.setSubmitting(false);
  };
  return (
    <div className="bg-gray-300 ">
      <Formik
        enableReinitialize={true}
        initialValues={client}
        onSubmit={handleSubmit}
        // validationSchema={Yup.object().shape({
        //   name: Yup.object().shape({
        //     first: Yup.string().required("Must be a valid name"),
        //     last: Yup.string().required("Must be a valid name"),
        //     title: Yup.string().required("Must be a valid name"),
        //   }),
        // })}
      >
        {(props) => {
          const { isSubmitting, values } = props;
          return (
            <Form>
              <div
                className="  bg-white border-gray-500 shadow-md overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto border-2 rounded-md p-6  "
              >
                <div className="flex flex-col items-end">
                  {/*-----------------ID Container----------*/}

                  <Container title="ID">
                    <MyTextInput
                      label="NHS Number"
                      name="nhs"
                      type="text"
                      placeholder="Please enter NHS number"
                    />
                  </Container>
                  {/*------------Name container-------------------------------------------*/}
                  <Container title="name">
                    {/*----title picklist------*/}
                    <MySelect
                      label="Title"
                      name="name.title"
                      options={titleDropdownOptions}
                    />
                    {/*----gender picklist------*/}
                    <MySelect
                      label="Gender"
                      name="gender.code"
                      options={genderDropdownOptions}
                    />

                    {/*----Date of birth------*/}
                    <MyDatePicker label="DOB" name="dob" />
                    {/*--------------first name---------*/}
                    <MyTextInput
                      label="First Name"
                      name="name.first"
                      type="text"
                      placeholder="Please enter name"
                    />

                    {/*----------last name-----------*/}
                    <MyTextInput
                      label="Last Name"
                      name="name.last"
                      type="text"
                      placeholder="Please enter last name"
                    />
                  </Container>

                  {/*-----------Address container-----------------------------------------*/}
                  <Container title="Address">
                    <div className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4">
                      <ul>
                        <li>{client.address.line1}</li>
                        <li>{client.address.line2}</li>
                        <li>{client.address.line3}</li>
                        <li>{client.address.line4}</li>
                        <li>{client.address.line5}</li>
                        <li>{client.address.postcode}</li>
                      </ul>
                    </div>
                    <div className="flex items-center mt-8 w-full justify-between">
                      <button
                        className=" inline-block   bg-pink-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
                        type="button"
                        placeholder="Please enter postcode"
                        onClick={() => {
                          setIsAddressSearchModalOpened(true);
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </Container>

                  {/* <div className="flex items-center mt-8 w-full justify-between">
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
                  </div> */}
                  {/*-------------------Drop List------------------------------*/}

                  {/* <AddressDropList
                    options={picklistOptions}
                    selected={{
                      id: "",
                      description: `Please select your address`,
                    }}
                    setSelected={(e) =>
                      setClient({
                        ...client,
                        address: { line1: e.description },
                      })
                    }
                  /> */}

                  {/*----------first line address-----------*/}

                  {/* <MyTextInput
                    label="First Line of Address"
                    name="address.line1"
                    type="text"
                    placeholder=""
                  /> */}

                  {/*----------second line of address-----------*/}

                  {/* <MyTextInput
                    label="Second Line of Address"
                    name="address.line2"
                    type="text"
                    placeholder=""
                  /> */}

                  {/*----------Third line of address-----------*/}
                  {/* <MyTextInput
                    label="Third Line of Address"
                    name="address.line3"
                    type="text"
                    placeholder=""
                  /> */}
                  {/*----------Fourth line of address-----------*/}
                  {/* <MyTextInput
                    label="Fourth Line of Address"
                    name="address.line4"
                    type="text"
                    placeholder=""
                  /> */}

                  {/*------------Postcode----------------*/}

                  {/* <MyTextInput
                    label="Postcode"
                    name="address.postcode"
                    type="text"
                    placeholder=""
                  /> */}

                  {/*********Development***************/}
                  <button
                    className=" inline-block text-xs mt-8 bg-green-400 px-2 py-1 rounded-md text-white font-semibold tracking-widest"
                    type="button"
                    onClick={() => {
                      console.log(values);
                    }}
                  >
                    Log out values
                  </button>

                  {/*----------button-------------*/}
                  <button
                    className=" inline-block  mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Modal
        isOpened={isAddressSearchModalOpened}
        onClose={() => setIsAddressSearchModalOpened(false)}
      >
        <AddressSearch client={client} setClient={setClient} />
      </Modal>
    </div>
  );
}
