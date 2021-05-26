import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import useAxios from "../../hooks/useAxios";

export default function Formio() {
  const [formResponse, setFormResponse] = useState();
  const [postData, setPostData] = useState();

  useEffect(() => {
    if (!postData) {
      return;
    }
    const url = "/api/forms/save/";
    const user = localStorage.getItem("EprUser");
    const userToken = JSON.parse(user);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://web2.ajbsoftware.co.uk:5000${url}`,
          { ...postData },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: userToken.token,
            },
          }
        );

        setFormResponse(response);
        console.log(formResponse);
      } catch (e) {
        console.log(`post form error ${url}`, e);
      }
    };

    fetchData();
  }, [postData]);

  const { response: structure } = useAxios(
    `/api/forms/structure/?id=referral_v1`
  );
  const { response: formData } = useAxios(
    `/api/forms/entry/?id=C66B277D-E6E5-443D-B619-4C483F9B020C`
  );

  const handleFormSubmit = (data) => {
    const { formId, entryDateTime, enteredBy, group } = formData.data;
    const formHeader = {
      formId,
      entryDateTime,
      enteredBy,
      group,
    };
    setPostData({ ...formHeader, values: { data: data.data } });
  };

  return (
    <div>
      <Form
        form={structure && structure.data.structure}
        onSubmit={(data) => {
          handleFormSubmit(data);
        }}
        //submission={formData && formData.data.values}
        //options={options}
      />
    </div>
  );
}
