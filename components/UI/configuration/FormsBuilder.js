import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormBuilder } from "react-formio";
import getApiData from "../../hooks/getApiData";
import BtnMain from "../../Shared/buttons/BtMain";
export default function FormsBuilder() {
  const [schema, setSchema] = useState();
  const [form, setForm] = useState(null);
  const router = useRouter();
  console.log("form state", form);
  {
    /*----------------Getting existing form-------------*/
  }
  console.log("builder is rendering");
  useEffect(() => {
    if (router.query.id) {
      getApiData(
        "GET",
        `/api/forms/structure/?id=${router.query.id}&datetime=${router.query.datetime}`
      ).then((x) => {
        console.log(x);
        setForm(x.data);
      });
    } else {
      setForm({
        id: "referral",
        title: "",
        structure: JSON.stringify({ display: "form" }),
      });
    }
  }, []);

  const handleFormSubmit = () => {
    console.log("to be sent back to api", form);
    const data = {
      id: form.id,
      title: form.title,
      structure: JSON.stringify(schema),
    };
    getApiData("POST", `/api/forms/structure/`, data);
  };
  if (form === null) {
    return null;
  }

  return (
    <div className=" mx-auto   w-full p-12 mt-4 border-2 border-gray-300">
      <input
        value={form.title}
        onChange={(e) => {
          setForm({ ...form, title: e.target.value });
        }}
        className="bg-red-200"
      ></input>
      <FormBuilder
        form={JSON.parse(form.structure)}
        onChange={(schema) => setSchema(schema)}
      />
      <div className="flex justify-center">
        <BtnMain onClick={handleFormSubmit}>Save</BtnMain>
      </div>
    </div>
  );
}
