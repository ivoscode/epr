import baseEditForm from "formiojs/components/_classes/component/Component.form";

const Autofill = (...extend) => {
  return baseEditForm(
    [
      {
        key: "display",
        components: [
          {
            // You can ignore existing fields.
            key: "placeholder",
            ignore: true,
          },
          {
            weight: 10,
            type: "select",
            input: true,
            label: "Field Type",
            key: "fieldType",
            dataSrc: "values",
            data: {
              values: [
                {
                  label: "Client ID",
                  value: "clientId",
                },
                {
                  label: "HCP",
                  value: "hcp",
                },
              ],
            },
          },
        ],
      },
      {
        key: "data",
        components: [],
      },
      {
        key: "validation",
        components: [],
      },
      {
        key: "api",
        components: [],
      },
      {
        key: "conditional",
        components: [],
      },
      {
        key: "logic",
        components: [],
      },
    ],
    ...extend
  );
};
export default Autofill;
