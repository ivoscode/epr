import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import getApiData from "../../../../hooks/getApiData";
import BtnMain from "../../../../Shared/buttons/BtMain";
import GpPracticeSearchResults from "./GpPracticeSearchResults";
import GpSearchResults from "./GpSearchResults";

export default function GpGpPracticeSearch(props) {
  const gpPracticeInput = useRef(null);

  const [initialGp] = useState({
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
      <div className="w-full border-2 border-gray-100 max-w-xl  rounded-xl p-5 mb-2 ">
        <div>{props.title}</div>
        {props.children}
      </div>
    );
  };
  {
    /* ----------fetch gp practice*/
  }
  const handleGpPracticeSearch = () => {
    if (gpPracticeInput.current.value.length < 2) {
      return;
    }
    const searchParams = { name: gpPracticeInput.current.value };
    getApiData("GET", `/api/gppractice/search/`, searchParams).then((x) => {
      if (x.data[0] == null) {
        setNothingFound(true);
        setShowGpPracticeSearchResults(true);
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
  {
    /*--------handle submit----------*/
  }
  const handleSubmit = (values) => {
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
  const validationSchema = Yup.object().shape({});
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialGp}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, setValues } = props;

          return (
            <Form>
              <div
                className=" mb-10    overflow-hidden flex 
       flex-col justify-center items-center  w-full mx-auto  rounded-md   "
              >
                {/*-------search box------------*/}
                <Container>
                  <div className=" justify-between items-center">
                    <div className="flex items-center  w-full justify-between ">
                      <div>
                        <input
                          type="text"
                          ref={gpPracticeInput}
                          className="input-box "
                        />
                      </div>
                      <BtnMain onClick={handleGpPracticeSearch}>Search</BtnMain>
                    </div>
                    {/*-----gp practice info------*/}
                    {values.gppractice.id && (
                      <div className="mt-8">
                        <ul>
                          <li>{values.gppractice.id}</li>
                          <li>{values.gppractice.description}</li>
                          <li>{values.gppractice.address.line1}</li>
                          <li>{values.gppractice.address.line2}</li>
                          <li>{values.gppractice.address.postcode}</li>
                        </ul>
                      </div>
                    )}
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
                {values.gp.id && (
                  <Container>
                    <div className=" justify-between items-center">
                      <div>
                        <ul>
                          <li>{values.gp.id}</li>
                          <li>{values.gp.description}</li>
                        </ul>
                      </div>
                    </div>
                  </Container>
                )}
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
                {values.gp.id && values.gppractice.id && (
                  <BtnMain style="mt-8" type="submit">
                    {/* disabled={isSubmitting} */}
                    Save
                  </BtnMain>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
