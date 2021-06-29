import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import BtnMain from "../../../../Shared/buttons/BtMain";
import MyAddressSearchInput from "./MyAddressSearchInput";
import MyTextInput from "./MyTextInput";
export default function MyAddressSearch(props) {
  const [initialAddress, setInitialAddress] = useState({
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
    postcode: "",
  });
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
  const isValidPostcode = (p) => {
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    const result = postcodeRegEx.test(p);

    return result;
  };
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
    /*------------Validation------------*/
  }
  const validationSchema = Yup.object().shape({
    line1: Yup.string().required("Required"),
    postcode: Yup.string().required("Required"),
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
            console.log(isSubmitting);
          }
          return (
            <Form>
              <div
                className=" mb-10  mt-52 sm:mt-16  overflow-hidden flex 
       flex-col justify-center items-center max-w-2xl mx-auto  rounded-md p-6  "
              >
                {/*----------search box--------------*/}
                <Container>
                  <MyAddressSearchInput setInitialAddress={setInitialAddress} />
                </Container>
                {/*----------Address fields-----------*/}
                <Container>
                  <MyTextInput
                    label="Address Line 1"
                    name="line1"
                    type="text"
                  />
                  <MyTextInput
                    label="Address Line 2"
                    name="line2"
                    type="text"
                  />
                  <MyTextInput label="Locality" name="line3" type="text" />
                  <MyTextInput label="Town or City" name="line4" type="text" />
                  <MyTextInput label="County" name="line5" type="text" />
                  <MyTextInput label="Postcode" name="postcode" type="text" />
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
