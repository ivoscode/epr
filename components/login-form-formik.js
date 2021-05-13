import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm() {
  const [serverState, setServerState] = useState();

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const handleOnSubmit = (values, actions) => {
    console.log("presseds");
    axios({
      method: "POST",
      url: "https://web2.dev.ajbsoftware.co.uk:5000/api/session/create/",
      data: values,
    })
      .then((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Thanks for contacting us!");
        setTimeout(() => setServerState(null), 6000);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        handleServerResponse(false, error.response.data.error);
      });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={formSchema}
    >
      {({ isSubmitting }) => (
        <Form id="fs-frm" noValidate>
          <div className="flex flex-col justify-center  h-full">
            <div className="block mx-auto mb-10">
              <img src="/images/Logo-vertical.png" alt="Logo" width={300} />
            </div>
            <div className="flex flex-col items-center ">
              <div className="w-2/3  mx-auto max-w-xs mb-8">
                <label className="text-gray-500 font-bold" htmlFor="email">
                  Email:
                </label>
                <div className="mt-2">
                  <Field
                    className=" w-full border-2 border-blue-300   rounded  py-2 px-4 "
                    id="email"
                    type="email"
                    name="email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  className="text-pink-600"
                  component="p"
                />
              </div>

              <div className="w-2/3  mx-auto max-w-xs">
                <div className="flex justify-between">
                  <label className="text-gray-500 font-bold" htmlFor="password">
                    Password:
                  </label>
                  <span className="text-sm">Forgot Password?</span>
                </div>
                <div className="mt-2">
                  <Field
                    className=" w-full border-2 border-blue-300   rounded  py-2 px-4"
                    id="password"
                    type="password"
                    name="password"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  className="text-pink-600"
                  component="p"
                />
              </div>
              <div className="mt-8">
                <Link href="/">
                  <button
                    className=" mt-8 bg-blue-500 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
                    type="submit"
                    disabled={false}
                  >
                    Login
                  </button>
                </Link>
              </div>
              {serverState && (
                <p className={!serverState.ok ? "errorMsg" : " text-pink-600"}>
                  {serverState.msg}
                </p>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
