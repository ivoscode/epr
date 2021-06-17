import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { generateGUID } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";
//displays form

export default function FormsEntryContent() {
  const user = JSON.parse(localStorage.getItem("EprUser"));
  const router = useRouter();
  const [structure, setStructure] = useState();
  const [formData, setFormData] = useState();
  console.log("form data recieved", formData);
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
        setFormData(x.data);
      });
  }, []);

  const handleFormSubmit = (form) => {
    const formHeader = {
      id: formData?.id ?? null,
      formId: router.query.formid,
      clientId: router.query.clientid,
      entryDateTime: new Date(),
      enteredBy: {
        id: user.hcpId,
        description: user.name,
      },
      group: formData?.group ?? generateGUID(),
    };

    getApiData(`POST`, `/api/forms/save`, {
      ...formHeader,
      values: { data: form.data },
    });
    setTimeout(() => {
      router.back();
    }, 3000);
  };

  return (
    <div>
      <Form
        form={structure?.data.structure}
        onSubmit={(data) => {
          handleFormSubmit(data);
        }}
        submission={formData?.values}
        //options={options}
      />
    </div>
  );
}
