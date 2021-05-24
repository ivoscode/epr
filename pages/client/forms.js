import dynamic from "next/dynamic";

const Formio = dynamic(() => import("../../components/UI/forms/Formio"), {
  ssr: false,
});

function Forms() {
  return (
    <div className="w-5/12 mx-auto bg-gray-200 p-10 rounded-md">
      <Formio />
    </div>
  );
}

export default Forms;
