import { useField } from "formik";
import React from "react";

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="flex items-center mt-4">
      <div className="flex  w-full justify-evenly items-center py-1">
        <div className=" text-gray-500 font-bold mr-10">
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>
        <input
          className="w-full border-2 border-blue-300 text-gray-500 rounded  py-2 px-4"
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
