import { useField } from "formik";
import React from "react";

export default function MySelect(props) {
  const [field, meta] = useField(props.name);
  const { label, name, options, ...rest } = props;

  //   console.log(meta);
  //   console.log(field);
  //   console.log(helpers);

  return (
    <div className="flex items-center mt-4">
      <div className="flex  w-full justify-evenly items-center py-1">
        <div className=" text-gray-500 font-bold mr-10">
          <label htmlFor={name}>{label}</label>
        </div>
        <select {...field} {...rest}>
          {options.map((option) => (
            <option key={option.description} value={option.code}>
              {option.description}
            </option>
          ))}
        </select>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
