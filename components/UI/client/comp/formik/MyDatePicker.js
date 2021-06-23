import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useField } from "formik";
import React from "react";

export default function MyDatePicker(props) {
  const [field, meta, helpers] = useField(props.name);
  const { label, name, options, ...rest } = props;

  return (
    <div className="flex items-center mt-4">
      <div className="flex  w-full justify-evenly items-center py-1">
        <div className=" text-gray-500 font-bold mr-10">
          <label htmlFor={name}>{label}</label>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              {...field}
              showTodayButton
              openTo="year"
              format="dd/MM/yyyy"
              views={["year", "month", "date"]}
              autoOk
              maxDate={new Date()}
              ampm={false}
              value={meta.value}
              onChange={(e) => {
                helpers.setValue(e);
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-pink-300">{meta.error}</div>
      ) : null}
    </div>
  );
}
