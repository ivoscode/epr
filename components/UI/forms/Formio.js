import { Form } from "react-formio";
export default function Formio() {
  const formStructure = {
    display: "form",

    components: [
      {
        label: "Text Field",
        tableView: true,
        key: "textField",
        type: "textfield",
        input: true,
      },
      {
        label: "Text Area",
        autoExpand: false,
        tableView: true,
        key: "textArea",
        type: "customAddressSearch",
        input: true,
      },
      {
        label: "Password",
        tableView: false,
        key: "password",
        type: "password",
        input: true,
        protected: true,
      },
      {
        label: "Radio",
        optionsLabelPosition: "right",
        description: "option 1",
        tooltip: "option 11",
        inline: false,
        tableView: false,
        values: [
          {
            label: "",
            value: "1",
            shortcut: "",
          },
          {
            label: "",
            value: "2",
            shortcut: "",
          },
          {
            label: "",
            value: "3",
            shortcut: "",
          },
        ],
        validate: {
          onlyAvailableItems: false,
        },
        key: "radio",
        type: "radio",
        input: true,
      },
      {
        label: "Submit",
        showValidations: false,
        theme: "danger",
        tableView: false,
        key: "submit1",
        type: "button",
        input: true,
        saveOnEnter: false,
      },
      {
        label: "Number",
        mask: false,
        spellcheck: true,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: "plain",
        key: "number",
        type: "number",
        input: true,
      },
      {
        label: "Checkbox",
        tableView: false,
        key: "checkbox",
        type: "checkbox",
        input: true,
      },
      {
        type: "button",
        label: "Submit",
        key: "submit",
        disableOnInvalid: true,
        input: true,
        tableView: false,
      },
    ],
  };

  return (
    <div>
      <Form
        form={formStructure}
        onSubmit={(data) => {
          console.log(data);
        }}
        //submission={formData}
        //options={options}
      />
    </div>
  );
}
