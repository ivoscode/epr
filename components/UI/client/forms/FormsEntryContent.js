import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import getApiData from "../../../hooks/getApiData";
//displays form

export default function FormsEntryContent() {
  const [dataToPost, setDataToPost] = useState();
  const router = useRouter();
  const [structure, setStructure] = useState();
  const [formData, setFormData] = useState();
  console.log("data to post back", dataToPost);
  //---------------------Getting form structure
  useEffect(() => {
    getApiData("GET", `/api/forms/structure/?id=${router.query.formid}`).then(
      (x) => {
        setStructure(x);
      }
    );
  }, []);

  //-----------------Getting form data if id present
  useEffect(() => {
    router.query.id &&
      getApiData("GET", `/api/forms/entry/?id=${router.query.id}`).then((x) => {
        setFormData(x);
      });
  }, []);
  //------------------Posting data back
  useEffect(() => {
    dataToPost && getApiData(`POST`, `/api/forms/save`, dataToPost);
  }, [dataToPost]);

  const handleFormSubmit = (data) => {
    console.log("handle form submit", data);
    const { formId, entryDateTime, enteredBy, group } = formData.data;
    const formHeader = {
      formId,
      entryDateTime,
      enteredBy,
      group,
    };
    setDataToPost({ ...formHeader, values: { data: data.data } });
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
        form={structure?.data.structure}
        onSubmit={(data) => {
          handleFormSubmit(data);
        }}
        onCustomEvent={handleCustomEvent}
        submission={formData?.data.values}
        //options={options}
      />
    </div>
  );
}
