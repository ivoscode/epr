import { useField } from "formik";
import React from "react";
import { formatNhs } from "../../../../helpers/helperFunctions";
export default function MyNhsNumberInput({
  label,
  registerChange,
  style,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { value, ...rest } = field;
  //console.log(field);
  //console.log(value);
  //console.log(rest);
  //console.log(helpers);
  return (
    <div className="flex flex-col items-center mt-4 ">
      <div className="flex w-full justify-evenly items-center mt-4 ">
        <div className=" text-gray-500 font-bold mr-10 w-1/2">
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>
        <div
          className="w-1/2"
          onClick={(e) => {
            if (typeof registerChange == "function") {
              registerChange();
              console.log("onchange fired");
            }
          }}
        >
          <input
            className={`input-box ${style}`}
            {...rest}
            {...props}
            value={formatNhs(value)}
            // onChange={(e) => {
            //   console.log(e.target.value);
            //   helpers.setValue(formatNhs(e.target.value));
            // }}
          />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
