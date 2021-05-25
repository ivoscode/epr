import { Form } from "react-formio";
import useAxios from "../../hooks/useAxios";
export default function Formio() {
  const { response: structure } = useAxios(
    `/api/forms/structure/?id=referral_v1`
  );
  const { response: formData } = useAxios(
    `/api/forms/entry/?id=C66B277D-E6E5-443D-B619-4C483F9B020C`
  );
  console.log(formData);

  return (
    <div>
      <Form
        form={structure && structure.data.structure}
        // onSubmit={(data) => {
        //   console.log(data);
        //}}
        submission={formData && formData.data.values}
        //options={options}
      />
    </div>
  );
}
