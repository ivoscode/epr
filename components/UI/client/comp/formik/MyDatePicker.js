import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useField } from "formik";
import React from "react";

export default function MyDatePicker(props) {
  const [field, meta, helpers] = useField(props.name);
  const { label, name, options, registerChange, ...rest } = props;
  // console.log(typeof field.value);
  // console.log(field.value);
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex w-full justify-evenly items-center mt-4">
        <div className=" text-gray-500 font-bold mr-10 w-1/2">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="w-1/2 text-center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              //showTodayButton
              openTo="month"
              format="dd/MM/yyyy"
              views={["month", "date", "year"]}
              autoOk
              //maxDate={new Date()}
              ampm={false}
              value={meta.value}
              onChange={(e) => {
                console.log(e);
                helpers.setValue(e);

                if (typeof registerChange == "function") {
                  registerChange();
                  console.log("onchange fired");
                }
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
