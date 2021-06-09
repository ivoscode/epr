import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-formio";
import useAxios from "../../../hooks/useAxios";
import useAxiosPost from "../../../hooks/useAxiosPost";
//displays form

export default function FormsEntryContent() {
  const [dataToPost, setDataToPost] = useState();
  const router = useRouter();

  const { response: structure } = useAxios(
    `/api/forms/structure/?id=${router.query.formid}`
  );

  const { response: formData } = useAxios(
    `/api/forms/entry/?id=${router.query.id}`
  );
  const { response, error, postData } = useAxiosPost(
    `/api/forms/save/`,
    dataToPost
  );

  const handleFormSubmit = (data) => {
    const { formId, entryDateTime, enteredBy, group } = formData.data;
    const formHeader = {
      formId,
      entryDateTime,
      enteredBy,
      group,
    };
    setDataToPost({ ...formHeader, values: { data: data.data } });
    postData();
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
