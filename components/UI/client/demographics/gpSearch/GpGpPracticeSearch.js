import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import getApiData from "../../../../hooks/getApiData";
import BtnMain from "../../../../Shared/buttons/BtMain";
//import MyTextInput from "../../comp/formik/MyTextInput";
import GpPracticeSearchResults from "./GpPracticeSearchResults";
import GpSearchResults from "./GpSearchResults";

export default function GpGpPracticeSearch(props) {
  const gpPracticeInput = useRef(null);
  const gpInput = useRef(null);

  const [initialGp, setInitialGp] = useState({
    gp: { id: "", description: "", address: { line1: "" } },
    gppractice: { id: "", description: "", address: { line1: "" } },
  });
  const [nothingFound, setNothingFound] = useState(false);
  const [gpPracticeSearchResults, setGpPracticeSearchResults] = useState(null);
  const [showGpPracticeSearchResults, setShowGpPracticeSearchResults] =
    useState(false);
  const [gpSearchResults, setGpSearchResults] = useState(null);
  const [showGpSearchResults, setShowGpSearchResults] = useState(false);
  const Container = (props) => {
    return (
      <div className="w-full border-2 border-gray-100 bg-green-500 rounded-xl p-8 mb-6 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };
  {
    /* ----------fetch gp practice*/
  }
  const handleGpPracticeSearch = (e) => {
    const searchParams = { name: gpPracticeInput.current.value };
    getApiData("GET", `/api/gppractice/search/`, searchParams).then((x) => {
      if (x.data[0] == null) {
        setNothingFound(true);
        return;
      }
      setNothingFound(false);
      setGpPracticeSearchResults(x.data);
      setShowGpPracticeSearchResults(true);
    });
  };

  {
    /*------------fetch gp--------------*/
  }
  const handleGpSearch = (e) => {
    const searchParams = { practice: e.id };
    getApiData("GET", `/api/gp/search`, searchParams).then((x) => {
      if (x.data[0] == null) {
        setNothingFound(true);
        return;
      }
      setNothingFound(false);
      setGpSearchResults(x.data);
      setShowGpSearchResults(true);
    });
  };
  const handleSubmit = (values) => {
    console.log(values);
    console.log(props.setValues);
    props.setValues({
      ...props.values,
      gppractice: {
        id: values.gppractice.id,
        description: values.gppractice.description,
      },
      gp: {
        id: values.gp.id,
        description: values.gp.description,
      },
    });

    props.onClose();
  };

  {
    /*------------Validation------------*/
  }
  const validationSchema = Yup.object().shape({
    //line1: Yup.string().required("Required"),
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
          const { isSubmitting, values, setValues } = props;
          {
            console.log(values);
          }
          return (
            <Form>
              <div
                className=" mb-10    overflow-hidden flex 
       flex-col justify-center items-center max-w-4xl mx-auto  rounded-md p-6  "
              >
                <Container>
                  <div className=" justify-between items-center">
                    <div className="flex items-center  w-full justify-between ">
                      <div>
                        <input
                          type="text"
                          ref={gpPracticeInput}
                          className="input-box uppercase"
                        />
                      </div>
                      <BtnMain onClick={handleGpPracticeSearch}>Search</BtnMain>
                    </div>
                    <div>
                      <ul>
                        <li>{values.gppractice.id}</li>
                        <li>{values.gppractice.description}</li>
                        <li>{values.gppractice.address.line1}</li>
                        <li>{values.gppractice.address.line2}</li>
                        <li>{values.gppractice.address.postcode}</li>
                      </ul>
                    </div>
                  </div>
                </Container>
                {showGpPracticeSearchResults && (
                  <GpPracticeSearchResults
                    nothingFound={nothingFound}
                    gpPracticeSearchRes={gpPracticeSearchResults}
                    handleGpPracticeSelection={(item) => {
                      setValues({ ...values, gppractice: item });
                      setShowGpPracticeSearchResults(false);
                      handleGpSearch(item);
                    }}
                  />
                )}
                {/*----------GP search-----------*/}
                <Container>
                  <div className=" justify-between items-center">
                    {/* <div className="flex items-center  w-full justify-between ">
                      <div>
                        <input
                          type="text"
                          ref={gpInput}
                          className="input-box uppercase"
                        />
                      </div>
                      <BtnMain
                        onClick={() => {
                          handleGpSearch(values.gppractice.id);
                        }}
                      >
                        Search
                      </BtnMain>
                    </div> */}
                    <div>
                      <ul>
                        <li>{values.gp.id}</li>
                        <li>{values.gp.description}</li>
                      </ul>
                    </div>
                  </div>
                </Container>
                {showGpSearchResults && (
                  <GpSearchResults
                    nothingFound={nothingFound}
                    gpSearchRes={gpSearchResults}
                    handleGpSelection={(item) => {
                      setValues({ ...values, gp: item });
                      setShowGpSearchResults(false);
                    }}
                  />
                )}
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
