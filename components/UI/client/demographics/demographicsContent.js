import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//import * as Yup from "yup";
import getApiData from "../../../hooks/getApiData";
export default function DemographicsContent({ id }) {
  const router = useRouter();
  const [client, setClient] = useState();
  console.log(client);

  useEffect(() => {
    if (isNaN(router.query.clientid)) {
      return;
    }
    getApiData(
      "GET",
      `/api/client/get/?clientId=${router.query.clientid}`
    ).then((x) => {
      setClient(x.data);
    });
  }, []);
  if (!client) {
    return null;
  }
  return (
    <div className="bg-gray-300 ">
      {/* <label>NHS Number</label>: <input type="text" value={client?.nhs} />
      <br />
      <label>Date of Birth</label>: <input type="DATE" value="" />
      <br /> */}
      <Formik
        initialValues={client}
        onSubmit={(e) => {
          console.log("formik event", e);
        }}
        // validationSchema={Yup.object().shape({
        //   name: Yup.object().shape({
        //     first: Yup.string().required("Must be a valid name"),
        //     last: Yup.string().required("Must be a valid name"),
        //     title: Yup.string().required("Must be a valid name"),
        //   }),
        // })}
      >
        {(props) => {
          const { isSubmitting } = props;
          return (
            <Form>
              <div
                className="  bg-white border-gray-500 shadow-md overflow-hidden flex 
       flex-col justify-center items-center max-w-lg mx-auto border-2 rounded-md p-6  "
              >
                <div className="flex flex-col items-end">
                  <div className="flex items-center mt-4 ">
                    <div className="flex  w-full justify-evenly items-center py-1">
                      <div className=" text-gray-500 font-bold mr-10">
                        <label htmlFor="Name">name</label>
                      </div>
                      <Field
                        type="text"
                        name="name.first"
                        className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 "
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-pink-300"
                    />
                  </div>
                  {/*-----------------item 2*/}
                  <div className="flex items-center mt-4">
                    <div className="flex  w-full justify-evenly items-center py-1">
                      <div className=" text-gray-500 font-bold mr-10">
                        <label htmlFor="nhs">nhs</label>
                      </div>
                      <Field
                        type="text"
                        name="nhs"
                        className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4 "
                      />
                    </div>
                    <ErrorMessage
                      name="nhs"
                      component="div"
                      className="text-pink-300"
                    />
                  </div>
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
    </div>
  );
}
