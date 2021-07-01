import format from "date-fns/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { generateGUID } from "../../../helpers/helperFunctions";
import getApiData from "../../../hooks/getApiData";

export default function FormsEntryContent() {
  const user = JSON.parse(sessionStorage.getItem("EprUser"));
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState();
  console.log("form data recieved", formData);

  //-----------------Getting form data if id present
  //Getting form data first, then structure based on date
  useEffect(() => {
    if (router.query.id) {
      getApiData("GET", `/api/forms/entry/?id=${router.query.id}`).then((x) => {
        getApiData(
          "GET",
          `/api/forms/structure/?id=${router.query.formid}&datetime=${x.data.entryDateTime}`
        ).then((s) => {
          setForm(s.data);
        });
        setFormData(x.data);
      });
    } else {
      getApiData(
        "GET",
        `/api/forms/structure/?id=${router.query.formid}&datetime=${format(
          new Date(),
          "yyyy-MM-dd'T'HH:mm"
        )}`
      ).then((x) => {
        setForm(x.data);
      });
    }
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
    }).then((x) => {
      x.status == 200 && router.back();
    });
  };

  if (form == null) {
    return null;
  }

  return (
    <div className=" mx-auto max-w-2xl mb-20 mt-44 sm:mt-24 lg:mt-16">
      <h1 className="text-center text-lg mb-5">{form.title}</h1>
      <Form
        form={JSON.parse(form.structure)}
        onSubmit={(data) => {
          handleFormSubmit(data);
        }}
        submission={formData?.values}
        //options={options}
      />
    </div>
  );
}
