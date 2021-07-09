import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import getApiData from "../../../../hooks/getApiData";
import BtnMain from "../../../../Shared/buttons/BtMain";
import MyTextInput from "../../comp/formik/MyTextInput";
import GpPracticeSearchResults from "./GpPracticeSearchResults";

export default function GpGpPracticeSearch(props) {
  const [initialGp, setInitialGp] = useState({
    gp: { id: 1, description: "desc" },
    gppractice: { id: 2, description: "Alvaston" },
  });
  const [nothingFound, setNothingFound] = useState(true);
  const [gpPracticeSearchResults, setGpPracticeSearchResults] = useState(null);

  const Container = (props) => {
    return (
      <div className="w-full border-2 border-gray-100 bg-green-500 rounded-xl p-8 mb-6 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };

  const handleGpPracticeSearch = (e) => {
    const searchParams = { name: e };
    getApiData("GET", `/api/gppractice/search/`, searchParams).then((x) => {
      if (x.data[0] == null) {
        setNothingFound(true);
        return;
      }
      setNothingFound(false);

      setGpPracticeSearchResults(x.data);
    });
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
  });
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialGp}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { isSubmitting, values } = props;
          {
            console.log(values);
          }
          return (
            <Form>
              <div
                className=" mb-10  mt-52 sm:mt-16  overflow-hidden flex 
       flex-col justify-center items-center max-w-4xl mx-auto  rounded-md p-6  "
              >
                <Container>
                  <div className=" justify-between items-center">
                    <div>
                      <MyTextInput
                        label="GP Practice"
                        name="gppractice.description"
                        type="text"
                        registerChange={props.registerChange}
                      />
                    </div>
                    <div>
                      <BtnMain
                        onClick={() => {
                          handleGpPracticeSearch(values.gppractice.description);
                        }}
                      >
                        Search
                      </BtnMain>
                    </div>
                  </div>
                </Container>
                <GpPracticeSearchResults
                  nothingFound={nothingFound}
                  gpPracticeSearchRes={gpPracticeSearchResults}
                />
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
