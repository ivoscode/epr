import { useField } from "formik";
import React from "react";

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col items-center mt-4 ">
      <div className="flex w-full justify-evenly items-center mt-4 ">
        <div className=" text-gray-500 font-bold mr-10 w-1/2">
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>
        <div className="w-1/2">
          <input className="input-box " {...field} {...props} />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
