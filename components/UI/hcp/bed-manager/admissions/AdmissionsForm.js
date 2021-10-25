import { Components, Form } from "@formio/react";
import format from "date-fns/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { generateGUID } from "../../../../helpers/helperFunctions";
import getApiData from "../../../../hooks/getApiData";
import BtnMain from "../../../../Shared/buttons/BtMain";
import components from "../../../../UI/configuration/forms/builderCustomComp";
Components.setComponents(components);

export default function AdmissionsForm() {
  // const ward = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("EprUser"));
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState();

  //Redirect to search for a patient first
  if (!router.query.clientid) {
    sessionStorage.setItem(`search-back`, router.asPath);
    router.push("/client/search/");
  }
  //Getting form  structure based on date
  useEffect(() => {
    getApiData(
      "GET",
      `/api/forms/structure/?id=${router.query.formid}&datetime=${format(
        new Date(),
        "yyyy-MM-dd'T'HH:mm"
      )}`
    ).then((x) => {
      setForm(x?.data);
    });
  }, []);
  // useEffect(() => {
  //   ward.current = document.querySelector("[ref=ward] div");
  //   const el1 = document.querySelector("[ref=ward] div");

  //   console.log(ward.current?.value);
  //   console.log("after selecting", el1?.innerText);
  //   el1 ? (el1.innerText = 5) : null;
  //   console.log(el1?.innerText);
  // });

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
      x.status == 200 && router.push("/hcp/bedManagement");
    });

    console.log("outgoing form data", form.data);
  };

  if (form == null || !router.query.clientid) {
    return null;
  }

  return (
    <div className=" mx-auto max-w-5xl mb-20 mt-44 sm:mt-24 lg:mt-16">
      <h1 className="text-center text-lg mb-10">{form.title}</h1>
      <div className="relative">
        <Form
          form={JSON.parse(form.structure)}
          onSubmit={(data) => {
            handleFormSubmit(data);
          }}
          submission={formData?.values}
        />
        <div className=" absolute bottom-0 flex  justify-center  bg-gray-200 left-36 rounded-lg mt-8">
          <BtnMain
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </BtnMain>
        </div>
      </div>
    </div>
  );
}
