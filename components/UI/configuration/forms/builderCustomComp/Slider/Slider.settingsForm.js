import baseEditForm from "formiojs/components/_classes/component/Component.form";

const Slider = (...extend) => {
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
            // Or add your own. The syntax is form.io component definitions.
            type: "number",
            input: true,
            label: "Min Range",
            weight: 12,
            key: "minRange",
          },
          {
            // Or add your own. The syntax is form.io component definitions.
            type: "number",
            input: true,
            label: "Max Range",
            weight: 12,
            key: "maxRange",
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
export default Slider;
