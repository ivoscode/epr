import axios from "axios";
//import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import useAxios from "../../../hooks/useAxios";
//const { Form } = dynamic(() => import("react-formio"), { ssr: false });

//displays form

export default function FormsEntryContent() {
  const [formResponse, setFormResponse] = useState();
  const [postData, setPostData] = useState();
  const router = useRouter();

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
    `/api/forms/structure/?id=${router.query.formid}`
  );

  const { response: formData } = useAxios(
    `/api/forms/entry/?id=${router.query.id}`
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

  const handleCustomEvent = (e) => {
    if (e.type == `close`) {
      // do back stuff
      router.back();
    }
  };

  return (
    <div>
      <Form
        form={structure && structure.data.structure}
        onSubmit={(data) => {
          handleFormSubmit(data);
        }}
        onCustomEvent={handleCustomEvent}
        submission={formData && formData.data.values}
        //options={options}
      />
    </div>
  );
}
