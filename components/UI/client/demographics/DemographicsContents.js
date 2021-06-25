import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApiData from "../../../hooks/getApiData";
import BtnMain from "../../../Shared/Buttons/BtnMain";
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
  };
  // const validationSchema={Yup.object().shape({
  //         name: Yup.object().shape({
  //           first: Yup.string().required("Must be a valid name"),
  //           last: Yup.string().required("Must be a valid name"),
  //           title: Yup.string().required("Must be a valid name"),
  //         }),
  //       })}
  return (
    <Formik
      enableReinitialize={true}
      initialValues={client}
      onSubmit={handleSubmit}
      //validationSchema={validationSchema}
    >
      {(props) => {
        const { isSubmitting } = props;

        return (
          <Form>
            <div
              className=" my-10   overflow-hidden flex 
       flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  "
            >
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
              <Container title="Name">
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
                <MyAddressSearch name="address" />
              </Container>

              {/*----------button-------------*/}

              <BtnMain style="mt-8" type="submit" disabled={isSubmitting}>
                Submit
              </BtnMain>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
