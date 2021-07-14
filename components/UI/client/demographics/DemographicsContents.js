import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { isValidNhsNumber } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
import Modal from "../../../Modal";
import BtnMain from "../../../Shared/buttons/BtMain";
import MyAddressSearch from "../comp/formik/MyAddressSearch";
import MyDatePicker from "../comp/formik/MyDatePicker";
import MyNhsNumberInput from "../comp/formik/MyNhsNumberInput";
import MySelect from "../comp/formik/MySelect";
import MyTextInput from "../comp/formik/MyTextInput";
import GpGpPracticeSearch from "./gpSearch/GpGpPracticeSearch";
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
    gp: { id: "", description: "" },
    gppractice: { id: "", description: "" },
    gender: {
      code: "",
      description: "",
    },
    telecom: null,
  });
  //console.log(client);

  const [isAddressSearchModalOpened, setIsAddressSearchModalOpened] =
    useState(false);
  const [isGpGpPracticeSearchModalOpened, setIsGpGpPracticeSearchModalOpened] =
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

    setTimeout(() => {
      router.reload();
    }, 1000);
  };
  //------------------Validation------------
  const validationSchema = Yup.object().shape({
    nhs: Yup.string()
      .min(10, "Too Short!")
      .max(10, "Too Long!")
      .test("NHS", "Invalid NHS number", (value) => isValidNhsNumber(value))
      .required("Required"),

    name: Yup.object().shape({
      title: Yup.string().required("Required"),
      first: Yup.string().required("Required"),
      last: Yup.string().required("Required"),
    }),
    gppractice: Yup.object().shape({
      description: Yup.string().nullable().required("Required"),
    }),
    gp: Yup.object().shape({
      description: Yup.string().nullable().required("Required"),
    }),

    address: Yup.object().shape({
      line1: Yup.string().required("Required"),

      postcode: Yup.string().required("Required"),
    }),

    dob: Yup.string().nullable().required("Required"),
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={client}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const {
          isSubmitting,
          values,
          errors,
          touched,
          setValues,
          status,
          setStatus,
        } = props;

        // console.log(props.touched);

        return (
          <Form autoComplete="off">
            <div
              className=" mb-10  mt-52 sm:mt-16  overflow-hidden flex 
       flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  "
            >
              {/*-----------------ID Container----------*/}

              <Container title="ID">
                <MyNhsNumberInput
                  label="NHS Number"
                  name="nhs"
                  type="text"
                  registerChange={(e) => setStatus(true)}
                />
              </Container>

              {/*------------Name container-------------------------------------------*/}
              <Container title="Name">
                {/*----title picklist------*/}
                <MySelect
                  label="Title"
                  name="name.title"
                  options={titleDropdownOptions}
                  registerChange={(e) => setStatus(true)}
                />
                {/*--------------first name---------*/}
                <MyTextInput
                  label="First Name"
                  name="name.first"
                  type="text"
                  registerChange={(e) => setStatus(true)}
                />

                {/*----------last name-----------*/}
                <MyTextInput
                  label="Last Name"
                  name="name.last"
                  type="text"
                  placeholder="Please enter last name"
                  registerChange={(e) => setStatus(true)}
                />
                {/*----gender picklist------*/}
                <MySelect
                  label="Gender"
                  name="gender.code"
                  options={genderDropdownOptions}
                  registerChange={(e) => setStatus(true)}
                />

                {/*----Date of birth------*/}
                <MyDatePicker
                  label="DOB"
                  name="dob"
                  registerChange={(e) => setStatus(true)}
                />
              </Container>

              {/*-----------Address-----------------------------------------*/}
              <Container title="Address">
                <div className="w-full border-2 h-40 border-blue-300 text-gray-500 rounded  py-2 px-4">
                  {touched?.address?.line1 && errors?.address?.line1 ? (
                    <div className="text-pink-300">
                      {errors?.address?.line1}
                    </div>
                  ) : null}
                  <ul>
                    <li>{values.address.line1}</li>
                    <li>{values.address.line2}</li>
                    <li>{values.address.line3}</li>
                    <li>{values.address.line4}</li>
                    <li>{values.address.line5}</li>
                    <li>{values.address.postcode}</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <BtnMain
                    style="mt-8"
                    onClick={() => {
                      setIsAddressSearchModalOpened(true);
                    }}
                  >
                    Search
                  </BtnMain>
                </div>
              </Container>
              {/*-----------------GP Search----------*/}
              <Container title="GP">
                <MyTextInput
                  disabled
                  label="GP Practice"
                  name="gppractice.description"
                  type="text"
                />
                <MyTextInput
                  disabled
                  label="GP"
                  name="gp.description"
                  type="text"
                />
                <div className="flex justify-end">
                  <BtnMain
                    style="mt-8"
                    onClick={() => {
                      setIsGpGpPracticeSearchModalOpened(true);
                    }}
                  >
                    Search
                  </BtnMain>
                </div>
              </Container>
              {/*-------------Modal for address search-------------*/}
              <Modal
                isOpened={isAddressSearchModalOpened}
                onClose={() => setIsAddressSearchModalOpened(false)}
              >
                <MyAddressSearch
                  onClose={() => {
                    setStatus(true);
                    setIsAddressSearchModalOpened(false);
                  }}
                  initialAddress={values.address}
                  setValues={setValues}
                  values={values}
                />
              </Modal>
              {/*-------------Modal for GP search-------------*/}
              <Modal
                isOpened={isGpGpPracticeSearchModalOpened}
                onClose={() => setIsGpGpPracticeSearchModalOpened(false)}
              >
                <GpGpPracticeSearch
                  onClose={() => {
                    setStatus(true);
                    setIsGpGpPracticeSearchModalOpened(false);
                  }}
                  setValues={setValues}
                  values={values}
                />
              </Modal>

              {/*----------button-------------*/}

              <div>
                <BtnMain
                  onClick={() => {
                    setStatus(false);
                  }}
                  style="mt-4"
                  type="submit"
                  hidden={!status}
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
