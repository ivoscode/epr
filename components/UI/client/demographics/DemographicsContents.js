import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import getApiData from "../../../hooks/getApiData";
import Modal from "../../../Modal";
import BtnMain from "../../../Shared/buttons/BtMain";
import MyAddressSearch from "../comp/formik/MyAddressSearch";
import MyDatePicker from "../comp/formik/MyDatePicker";
import MySelect from "../comp/formik/MySelect";
import MyTextInput from "../comp/formik/MyTextInput";
export default function DemographicsContent() {
  const router = useRouter();

  //prevents screen flashing
  const clientId = router.query.clientid;
  if (!clientId) {
    return null;
  }

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
    dob: null,
    gender: {
      code: "",
      description: "", ////mandatory field 2 is for female
    },
    telecom: null,
  });
  const [formIsTouched, setFormIsTouched] = useState(false);
  const [isAddressSearchModalOpened, setIsAddressSearchModalOpened] =
    useState(false);
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
  //------styling container
  const Container = (props) => {
    return (
      <div className="w-full border-2 border-gray-100 rounded-xl p-8 mb-6 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };

  //----------- Getting data for existing client if client id contains number
  //other option is NEW for new clients
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
    setFormIsTouched(false);
  };
  const validationSchema = Yup.object().shape({
    nhs: Yup.string()
      .min(10, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),

    name: Yup.object().shape({
      title: Yup.string().required("Required"),
      first: Yup.string().required("Required"),
      last: Yup.string().required("Required"),
    }),
    address: Yup.object().shape({
      line1: Yup.string().required("Required"),

      postcode: Yup.string().required("Required"),
    }),

    dob: Yup.string().required("Required"),
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={client}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { isSubmitting, values, setValues } = props;

        {
          console.log(props);
        }

        return (
          <Form>
            <div
              className=" mb-10  mt-52 sm:mt-16  overflow-hidden flex 
       flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  "
            >
              {/*-----------------ID Container----------*/}

              <Container title="ID">
                <MyTextInput
                  label="NHS Number"
                  name="nhs"
                  type="text"
                  onChange={(e) => setFormIsTouched(true)}
                />
              </Container>
              {/*------------Name container-------------------------------------------*/}
              <Container title="Name">
                {/*----title picklist------*/}
                <MySelect
                  label="Title"
                  name="name.title"
                  options={titleDropdownOptions}
                  onChange={(e) => setFormIsTouched(true)}
                />
                {/*--------------first name---------*/}
                <MyTextInput
                  label="First Name"
                  name="name.first"
                  type="text"
                  setFormIsTouched={setFormIsTouched}
                  onChange={(e) => setFormIsTouched(true)}
                />

                {/*----------last name-----------*/}
                <MyTextInput
                  label="Last Name"
                  name="name.last"
                  type="text"
                  placeholder="Please enter last name"
                  onChange={(e) => setFormIsTouched(true)}
                />
                {/*----gender picklist------*/}
                <MySelect
                  label="Gender"
                  name="gender.code"
                  options={genderDropdownOptions}
                  onChange={(e) => setFormIsTouched(true)}
                />

                {/*----Date of birth------*/}
                <MyDatePicker
                  label="DOB"
                  name="dob"
                  onChange={(e) => setFormIsTouched(true)}
                />
              </Container>

              {/*-----------Address-----------------------------------------*/}
              <Container title="Address">
                <div className="w-full border-2 h-40 border-blue-300 text-gray-500 rounded  py-2 px-4">
                  <ul>
                    <li>{values.address.line1}</li>
                    <li>{values.address.line2}</li>
                    <li>{values.address.line3}</li>
                    <li>{values.address.line4}</li>
                    <li>{values.address.line5}</li>
                    <li>{values.address.postcode}</li>
                  </ul>
                </div>

                <BtnMain
                  style="mt-8"
                  onClick={() => setIsAddressSearchModalOpened(true)}
                >
                  Search
                </BtnMain>
              </Container>

              {/*-------------Modal for address search-------------*/}
              <Modal
                isOpened={isAddressSearchModalOpened}
                onClose={() => setIsAddressSearchModalOpened(false)}
              >
                <MyAddressSearch
                  onClose={() => setIsAddressSearchModalOpened(false)}
                  initialAddress={values.address}
                  setValues={setValues}
                  values={values}
                />
              </Modal>

              {/*----------button-------------*/}

              <div>
                <BtnMain
                  style="mt-4"
                  type="submit"
                  hidden={!formIsTouched}
                  disabled={isSubmitting}
                >
                  Save
                </BtnMain>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
