import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormBuilder } from "react-formio";
import getApiData from "../../hooks/getApiData";
import BtnMain from "../../Shared/buttons/BtMain";
export default function FormsBuilder() {
  const [schema, setSchema] = useState();
  const [form, setForm] = useState(null);
  const [idDisabled, setIdDisabled] = useState(false);
  const router = useRouter();

  {
    /*----------------Getting existing form-------------*/
  }

  useEffect(() => {
    console.log("fetching data");
    if (router.query.id) {
      getApiData(
        "GET",
        `/api/forms/structure/?id=${router.query.id}&datetime=${router.query.datetime}`
      ).then((x) => {
        console.log(x.data);
        setIdDisabled(true);
        setForm({
          id: x.data.id,
          title: x.data.title,
          structure: JSON.parse(x.data.structure),
        });
      });
    } else {
      setForm({
        id: "",
        title: "",
        structure: { display: "form" },
      });
    }
  }, []);
  {
    /*---------------submit form---------------------*/
  }
  const handleFormSubmit = () => {
    const data = {
      id: form.id,
      title: form.title,
      structure: JSON.stringify(schema),
    };
    getApiData("POST", `/api/forms/structure/`, data).then((x) => {
      x.status == 200 && router.back();
    });
  };

  if (form === null) {
    return null;
  }

  return (
    <div className=" mx-auto   w-full p-12 mt-4 border-2 border-gray-300">
      <div className="flex justify-evenly mb-5 ">
        <input
          disabled={idDisabled}
          placeholder="Please enter type"
          value={form.id}
          onChange={(e) => {
            setForm({ ...form, id: e.target.value });
          }}
          className="form-control max-w-sm"
        ></input>
        <input
          placeholder="Please enter title"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
          className="form-control max-w-sm"
        ></input>
      </div>
      <FormBuilder
        form={form.structure}
        onChange={(schema) => setSchema(schema)}
      />
      <div className="flex justify-center">
        <BtnMain onClick={handleFormSubmit}>Save</BtnMain>
      </div>
    </div>
  );
}
