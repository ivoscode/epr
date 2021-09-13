//import baseEditForm from "@formio/core/lib/components/_classes/component/Component.form";
import baseEditForm from "formiojs/components/_classes/component/Component.form";

const Example = (...extend) => {
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
            type: "textfield",
            input: true,
            label: "My Custom Setting",
            weight: 12,
            key: "myCustomSetting", // This will be available as component.myCustomSetting
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
export default Example;
