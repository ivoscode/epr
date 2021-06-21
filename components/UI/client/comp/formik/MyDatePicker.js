import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import format from "date-fns/format";
import { useField } from "formik";
import React from "react";

export default function MyDatePicker(props) {
  const [field, meta, helpers] = useField(props.name);
  const { label, name, options } = props;

  // console.log(meta);
  // console.log(field);
  // console.log(helpers);

  return (
    <div className="flex items-center mt-4">
      <div className="flex  w-full justify-evenly items-center py-1">
        <div className=" text-gray-500 font-bold mr-10">
          <label htmlFor={name}>{label}</label>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              {...field}
              showTodayButton
              autoOk
              ampm={false}
              value={meta.value}
              onChange={(e) =>
                helpers.setValue(format(e, "yyyy-MM-dd'T'HH:mm"))
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        {/* <select {...field}>
          {options.map((option) => (
            <option key={option.description} value={option.code}>
              {option.description}
            </option>
          ))}
        </select> */}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
