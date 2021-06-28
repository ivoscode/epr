import { useField } from "formik";
import React from "react";

export default function MySelect(props) {
  const [field, meta] = useField(props.name);
  const { label, name, options, setFormIsTouched, onChange, ...rest } = props;

  //   console.log(meta);
  //   console.log(field);
  //   console.log(helpers);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex w-full justify-evenly items-center mt-4">
        <div className=" text-gray-500 font-bold mr-10 w-1/2">
          <label htmlFor={name}>{label}</label>
        </div>
        <div
          className="w-1/2"
          onChange={(e) => {
            if (typeof onChange == "function") {
              onChange(e);
              console.log("onchange fired");
            }
          }}
        >
          <select {...field} {...rest} className="input-box ">
            {options.map((option) => (
              <option key={option.description} value={option.code}>
                {option.description}
              </option>
            ))}
          </select>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
