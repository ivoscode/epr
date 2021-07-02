import format from "date-fns/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormBuilder } from "react-formio";
import getApiData from "../../hooks/getApiData";
import BtnMain from "../../Shared/buttons/BtMain";
import MyDialog from "../../Shared/MyDialog";

export default function FormsBuilder() {
  const [schema, setSchema] = useState();
  const [form, setForm] = useState(null);
  const [idDisabled, setIdDisabled] = useState(false);
  let [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  {
    /*----------------Getting existing form-------------*/
  }

  useEffect(() => {
    console.log("fetching data");
    if (router.query.id) {
      getApiData(
        "GET",
        `/api/forms/structure/?id=${router.query.id}&datetime=${format(
          new Date(),
          `yyyy-MM-dd'T'HH:mm:ss`
        )}`
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
    if (data.id.length <= 1) {
      setIsDialogOpen(true);
      setMessage("Please add a form ID.");
      return;
    }
    if (data.title.length < 1) {
      setIsDialogOpen(true);
      setMessage("Please add a form Title.");
      return;
    }

    if (schema.components.length < 1) {
      setIsDialogOpen(true);
      setMessage("Please add an element to the form.");
      return;
    }

    getApiData("POST", `/api/forms/structure/`, data).then((x) => {
      x.status == 200 && router.push("/configuration/forms/list");
    });
  };

  if (form === null) {
    return null;
  }

  return (
    <>
      {/*-------alert box---------*/}
      <MyDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        message={message}
      />
      {/*----------------------------------------*/}
      <div className=" mx-auto   w-full p-12 mt-4 border-2 border-gray-300">
        <div className="flex  flex-col md:flex-row justify-evenly mb-5 ">
          {/*--------input for Id-------------*/}
          <div className="w-full md:mr-8">
            <label className="text-lg" htmlFor="ID">
              ID
            </label>
            <input
              name="ID"
              disabled={idDisabled}
              placeholder="Please enter type"
              value={form.id}
              onChange={(e) => {
                setForm({ ...form, id: e.target.value });
              }}
              className="form-control "
            ></input>
          </div>
          {/*-------------input for title---------------*/}
          <div className="w-full md:ml-8 mt-5 md:mt-0">
            <label className="text-lg" htmlFor="Title">
              Title
            </label>
            <input
              name="Title"
              placeholder="Please enter title"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
              className="form-control"
            ></input>
          </div>
        </div>
        {/*----------------------------------*/}
        <FormBuilder
          form={form.structure}
          onChange={(schema) => {
            setSchema(schema);
            console.log(schema);
          }}
        />
        <div className="flex justify-center">
          <BtnMain style="mx-12" onClick={handleFormSubmit}>
            Save
          </BtnMain>
          <BtnMain
            style="mx-12"
            onClick={() => {
              router.push("/configuration/forms/list");
            }}
          >
            Close
          </BtnMain>
        </div>
      </div>
    </>
  );
}
